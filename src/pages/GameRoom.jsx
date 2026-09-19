import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/css/common.css';
import '../pages/css/gameRoom.css';
import ChatBubble from '../components/ChatBubble';

const GameRoom = () => {
    const navigate = useNavigate();
    const startedRef = useRef(false);
    const textRef = useRef('');
    const autoSentRef = useRef(false);
    const chatEndRef = useRef(null);

    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [text, setText] = useState('');
    const [sending, setSending] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(null);

    const startMatch = useCallback(async () => {
        setLoading(true);
        setError('');
        setText('');
        textRef.current = '';
        try {
            const { data } = await axios.post('/arena/start');
            autoSentRef.current = false;
            setMatch(data);
        } catch (err) {
            setError('연습전을 시작하지 못했습니다. 백엔드가 켜져 있는지 확인하세요.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (startedRef.current) {
            return;
        }
        startedRef.current = true;
        startMatch();
    }, [startMatch]);

    useEffect(() => {
        textRef.current = text;
    }, [text]);

    const lineCount = match ? match.lines.length : 0;
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lineCount]);

    const matchId = match ? match.matchId : null;
    const phase = match ? match.phase : null;
    const playerTurn = match ? match.playerTurn : false;
    const finished = match ? match.finished : false;

    useEffect(() => {
        if (!matchId || finished || !playerTurn) {
            setSecondsLeft(null);
            return undefined;
        }
        autoSentRef.current = false;
        setSecondsLeft(match.phaseSeconds);
        const timer = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev === null || prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [matchId, phase, playerTurn, finished, match]);

    const speak = useCallback(async (raw) => {
        if (!match || match.finished || sending) {
            return;
        }
        setSending(true);
        try {
            const { data } = await axios.post(`/arena/${match.matchId}/speak`, { text: raw || '' });
            autoSentRef.current = false;
            setMatch(data);
            setText('');
            textRef.current = '';
        } catch (err) {
            setError('발언을 보내지 못했습니다.');
        } finally {
            setSending(false);
        }
    }, [match, sending]);

    useEffect(() => {
        if (secondsLeft !== 0 || !match || match.finished || sending || autoSentRef.current) {
            return;
        }
        autoSentRef.current = true;
        speak(textRef.current);
    }, [secondsLeft, match, sending, speak]);

    const exitClick = () => {
        const exitCheck = window.confirm('연습전을 나가시겠습니까?');
        if (exitCheck) {
            navigate('/room-list');
        }
    };

    const totalScore = match ? Math.max(1, match.playerScore + match.aiScore) : 1;
    const playerMeter = match ? Math.round((match.playerScore / totalScore) * 100) : 50;

    return (
        <div className='backPage'>
            <div className='gameContainer'>
                <div className='gameHeader'>
                    <div className='gameBrand'>
                        <img className='brandMark' src={`${process.env.PUBLIC_URL}/assets/images/GolabLogo.png`} alt="GoLAB 고래" />
                        <span className='gameLogo'>GoLAB</span>
                        <span className='gameRoomName'>연습전 · {match ? match.persona : 'AI'}</span>
                    </div>
                    <div className='gameHeaderActions'>
                        {match && <span className='phasePill'>{match.phaseHint}</span>}
                        <button className='gameExitBtn' onClick={exitClick}>나가기</button>
                    </div>
                </div>
                <div className='gameContent'>
                    <div className='gameChatBox'>
                        <div className='chatContent'>
                            {loading && <div className='arenaStatus'>주제를 추첨하는 중...</div>}
                            {error && <div className='arenaStatus arenaError'>{error}</div>}
                            {match && !loading && match.lines.length === 0 && (
                                <div className='chatEmpty'>
                                    <img className='chatEmptyMark' src={`${process.env.PUBLIC_URL}/assets/images/GolabLogo.png`} alt="" />
                                    <p>고래처럼 한 숨 고르고, 한 줄로 말하세요.</p>
                                </div>
                            )}
                            {match && match.lines.map((line, index) => (
                                <ChatBubble
                                    key={`${line.speaker}-${index}`}
                                    message={line.speaker === 'JUDGE' ? line.text : line.text}
                                    isUser={line.speaker === 'PLAYER'}
                                    kind={line.speaker === 'JUDGE' ? 'judge' : undefined}
                                    label={line.speaker === 'AI' ? match.persona : undefined}
                                />
                            ))}
                            {sending && <div className='arenaStatus'>상대가 반박하는 중...</div>}
                            <div ref={chatEndRef} />
                        </div>
                        <div className='chatInputDiv'>
                            <input
                                className='chatInput'
                                value={text}
                                disabled={!match || match.finished || sending}
                                placeholder={match && match.phaseHint ? match.phaseHint : '발언을 입력하세요'}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        speak(text);
                                    }
                                }}
                            />
                            <button
                                className='sendChat'
                                disabled={!match || match.finished || sending}
                                onClick={() => speak(text)}
                            >
                                전송
                            </button>
                        </div>
                    </div>
                    <div className='gameFunctions'>
                        <div className='timerBox'>
                            <div className='timerLabel'>{match && !match.finished && secondsLeft !== null ? '남은 시간' : (match ? match.phaseHint : '입장')}</div>
                            <div className={`timerValue ${secondsLeft !== null && secondsLeft <= 10 ? 'timerUrgent' : ''}`}>
                                {match && !match.finished && secondsLeft !== null
                                    ? <>{secondsLeft}<span className='timerUnit'>초</span></>
                                    : match && match.finished ? '종료' : '--'}
                            </div>
                        </div>
                        <div className='topicBox'>
                            <div className='topicTitle'>{match ? match.topic : '주제 대기'}</div>
                            <div className='topicMeta'>
                                내 입장 {match ? match.playerStance : '-'} · 상대 {match ? match.aiStance : '-'}
                            </div>
                            <div className='constraintChip'>{match ? match.constraint : ''}</div>
                        </div>
                        <div className='juryMeterBox'>
                            <div className='juryMeterLabel'>배심원 미터</div>
                            <div className='juryMeterTrack'>
                                <div className='juryMeterFill' style={{ width: `${playerMeter}%` }} />
                            </div>
                            <div className='juryMeterScores'>
                                <span>나 {match ? match.playerScore : 0}</span>
                                <span>AI {match ? match.aiScore : 0}</span>
                            </div>
                        </div>
                        <div className='ggButton' onClick={exitClick}>
                            항복하기
                            <img src={`${process.env.PUBLIC_URL}/assets/images/game/white-flag.png`} className="surrenderIcon" alt="항복하다"/>
                        </div>
                        <div className='participantList'>
                            <div className='oneParticipant'>
                                <div className='participantName'>나</div>
                                <div className='player1Role'>플레이어</div>
                            </div>
                            <div className='oneParticipant'>
                                <div className='participantName'>{match ? match.persona : 'AI'}</div>
                                <div className='player2Role'>AI 상대</div>
                            </div>
                        </div>
                    </div>
                </div>
                {match && match.finished && !loading && (
                    <div className='verdictOverlay'>
                        <div className='verdictCard'>
                            <div className='verdictWinner'>
                                {match.winner === 'PLAYER' ? '승리' : match.winner === 'AI' ? '패배' : '무승부'}
                            </div>
                            <div className='verdictScore'>{match.playerScore} : {match.aiScore}</div>
                            <p className='verdictText'>{match.verdict}</p>
                            <button className='verdictAgain' onClick={startMatch}>한 판 더</button>
                            <button className='verdictExit' onClick={() => navigate('/room-list')}>나가기</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameRoom;
