import React, { useState } from "react";
import { Button } from "reactstrap";
import { Engine, Scene, Skybox } from "react-babylonjs";
import {
  Vector3,
  Color3,
  ActionManager,
  SetValueAction
} from "@babylonjs/core";

import Octicon, { ArrowDown, ArrowUp } from "@githubprimer/octicons-react";
import ScaledModelWithProgress from "./ScaledModelWithProgress";

const onModelLoaded = model => {
  let mesh = model.meshes[1];
  // console.log("loaded mesh:", mesh);
  console.log("loaded mesh:", mesh._scene.materials);
  const materials = mesh._scene.materials;
  console.log("Materials:", materials);
  materials.map(mt => {
    return console.log(mt.id);
  });
  mesh.actionManager = new ActionManager(mesh._scene);
  mesh.actionManager.registerAction(
    new SetValueAction(
      ActionManager.OnPointerOverTrigger,
      mesh.material,
      "wireframe",
      true
    )
  );
  mesh.actionManager.registerAction(
    new SetValueAction(
      ActionManager.OnPointerOutTrigger,
      mesh.material,
      "wireframe",
      false
    )
  );
};

const WithModel = props => {
  const [shaftview, setShaftView] = useState(<></>);
  const [elevatorSettings, updateElevatorSettings] = useState({
    elevatorYPos: -1.5,
    elevatorScaling: 3.0
  });

  const moveElevatorDown = () => {
    updateElevatorSettings(state => ({
      ...state,
      elevatorYPos: state.elevatorYPos - 0.5
    }));
  };

  const moveElevatorUp = () => {
    updateElevatorSettings(state => ({
      ...state,
      elevatorYPos: state.elevatorYPos + 0.5
    }));
  };
  const activateShaftView = () => {
    setShaftView(
      <ScaledModelWithProgress
        rootUrl={`scene/`}
        sceneFilename="morris-shaft.glb"
        scaleTo={13.5}
        progressBarColor={Color3.FromInts(255, 165, 0)}
        center={new Vector3(0, -1.5, 0)}
      />
    );
  };

  const deactivateShaftView = () => {
    setShaftView(<></>);
  };
  // const increaseAvocadoSize = () => {
  //   updateElevatorSettings((state) => ({
  //     ...state,
  //     elevatorScaling: state.elevatorScaling + 0.1
  //   }))
  // }

  // const decreaseAvocadoSize = () => {
  //   updateElevatorSettings((state) => ({
  //     ...state,
  //     elevatorScaling: state.elevatorScaling - 0.1
  //   }))
  // }

  return (
    <div>
      <div className="row">
        <div className="col-xs-3 col-lg-3 align-top">
          Move Elevator: &nbsp;&nbsp;
          <Button onClick={moveElevatorUp}>
            <Octicon icon={ArrowUp} />
          </Button>
          &nbsp;&nbsp;
          <Button onClick={moveElevatorDown}>
            <Octicon icon={ArrowDown} />
          </Button>
        </div>
        <div className="col-xs-3 col-lg-3 align-top">
          <Button onClick={activateShaftView}>Shaft View</Button>
          <Button onClick={deactivateShaftView}>Car View</Button>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col">
          <Engine
            antialias={true}
            adaptToDeviceRatio={true}
            canvasId="sample-canvas"
          >
            <Scene>
              <Skybox rootUrl={"textures/environment.dds"} />
              <arcRotateCamera
                name="camera1"
                allowUpsideDown={false}
                cameraDirection={Vector3.Zero()}
                ignoreParentScaling={true}
                alpha={Math.PI / 2}
                beta={Math.PI / 2}
                radius={9.0}
                target={Vector3.Zero()}
                minZ={0.001}
                pinchPrecision={0.00000001}
                pinchToPanMaxDistance={0.0001}
                zoomOnFactor={0.00001}
              />
              <hemisphericLight
                name="light1"
                intensity={0.7}
                direction={Vector3.Up()}
              />
              {shaftview}
              <ScaledModelWithProgress
                rootUrl={`scene/`}
                sceneFilename="morris.glb"
                scaleTo={3}
                progressBarColor={Color3.FromInts(255, 165, 0)}
                center={new Vector3(0, elevatorSettings.elevatorYPos, 0)}
                onModelLoaded={onModelLoaded}
              />
            </Scene>
          </Engine>
        </div>
      </div>
    </div>
  );
};

export default WithModel;
