import { _decorator, Component, Node, Camera, Vec3, Quat } from 'cc';
import {mirrorUtil } from './mirrorUtil';
const { ccclass, property, executeInEditMode } = _decorator;

const _tmpN = new Vec3();
const _mirrorP = new Vec3();

const _tmpForward = new Vec3();
const _tmpUp = new Vec3();
const _tmpQuat = new Quat();

@ccclass('refelctionCamera')
@executeInEditMode(true)
export class refelctionCamera extends Component {
    @property(Camera)
    mainCamera:Camera = null;

    @property(Node)
    mirror:Node = null;

    onEnable(){

    }

    lateUpdate(){
        /**同步镜像位置 */
        let p = this.mainCamera.node.worldPosition;
        Vec3.transformQuat(_tmpN, Vec3.UP, this.mirror.worldRotation);
        _tmpN.negative();

        let mirrorPoint = this.mirror.worldPosition;
        let d = Vec3.dot(mirrorPoint, _tmpN);
        mirrorUtil.getMirrorPoint(_mirrorP, p, _tmpN, d);
        this.node.worldPosition = _mirrorP;

        /**同步镜像方向 */
        //forward 
        Vec3.transformQuat(_tmpForward, Vec3.FORWARD, this.mainCamera.node.worldRotation);
        _tmpForward.normalize();
        mirrorUtil.getMirrorPoint(_tmpForward, _tmpForward, _tmpN, 0);
        _tmpForward.normalize();
        _tmpForward.negative();

        //up
        Vec3.transformQuat(_tmpUp, Vec3.UP, this.mainCamera.node.worldRotation);
        _tmpUp.normalize();
        mirrorUtil.getMirrorPoint(_tmpUp, _tmpUp, _tmpN, 0);
        _tmpUp.normalize();
        _tmpUp.negative();

        Quat.fromViewUp(_tmpQuat, _tmpForward, _tmpUp);
        this.node.worldRotation = _tmpQuat;
    }
}

