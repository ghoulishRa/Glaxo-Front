import React from 'react';

const RobotIcon = ({ x, y }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32" height="32"
    fill="red"
    viewBox="0 0 36 36"
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none'
    }}
  >
    <path d="m21,11v-3c0-1.1-.9-2-2-2h-6v-1.39c.3-.27.5-.67.5-1.11,0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5,1.5c0,.44.2.84.5,1.11v1.39h-6c-1.1,0-2,.9-2,2v3c-.55,0-1,.45-1,1v4c0,.55.45,1,1,1v3c0,1.1.9,2,2,2h14c1.1,0,2-.9,2-2v-3c.55,0,1-.45,1-1v-4c0-.55-.45-1-1-1Zm-14,1c0-1.1.67-2,1.5-2s1.5.9,1.5,2-.67,2-1.5,2-1.5-.9-1.5-2Zm9,6h-8v-2h8v2Zm-.5-4c-.83,0-1.5-.9-1.5-2s.67-2,1.5-2,1.5.9,1.5,2-.67,2-1.5,2Z"></path>
  </svg>
);

const PackageIcon = ({ x, y }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32" height="32"
    fill="blue"
    viewBox="0 0 42 42"
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none'
    }}
  >
    <path d="M20 4H4c-1.1 0-2 .9-2 2v.25l10 7.5 10-7.5V6c0-1.1-.9-2-2-2"></path><path d="M12 16c-.21 0-.42-.07-.6-.2L2 8.75V18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8.75l-9.4 7.05c-.18.13-.39.2-.6.2"></path>
  </svg>
);

const TargetIcon = ({ x, y, type }) => {
  switch (type) {
    case 'robot':
      return <RobotIcon x={x} y={y} />;
    case 'package':
      return <PackageIcon x={x} y={y} />;
    default:
      return null;
  }
};

export default TargetIcon;

< i class='bx  bxs-robot'  ></i> 