import React from "react";
import { BackgroundPage } from "./BackgroundPage";
import { ChevronLeft } from "./ChevronLeft";
import { ChevronRight } from "./ChevronRight";
import { Component108 } from "./Component108";
import { DivWrapper } from "./DivWrapper";
import "./style.css";

export const Screen = () => {
  return (
    <div className="screen">
      <div className="overlap-wrapper">
        <div className="overlap">
          <BackgroundPage backgroundPage="image.svg" className="background-page-instance" />
          <div className="view">
            <DivWrapper className="component-107" />
            <DivWrapper className="component-107-instance" text="[일반전]" />
            <DivWrapper className="design-component-instance-node" text="[커스텀전]" />
            <DivWrapper className="view-2" text="[일반전]" />
            <DivWrapper className="view-3" text="[커스텀전]" />
            <DivWrapper className="view-4" text="[일반반전]" />
            <DivWrapper className="view-5" text="[커스텀전]" />
            <DivWrapper className="view-6" text="[커스텀전]" />
            <div className="frame-2">
              <ChevronLeft className="chevron-left" />
              <div className="text-wrapper-2">1</div>
              <ChevronRight className="chevron-right" />
            </div>
            <Component108 className="component-108-instance" />
            <div className="overlap-group-wrapper">
              <div className="overlap-2">
                <div className="text-wrapper-3">참여하기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
