import { _decorator, Component, Node, Vec3, Mat3, Mat4, mat4, Camera, CameraComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('plannerReflection')
export class plannerReflection extends Component {

    @property(Camera)
    rCamera:Camera = null;
    /**
     * 计算获取镜面反射矩阵
     * @param normal 法线
     * @param mirrorPlane 镜面原点坐标 
     */
    getReflectMatrix(normal:Vec3, mirrorPlanePos:Vec3):Mat4{
        let d = -Vec3.dot(normal, mirrorPlanePos);
        let reflectMat:Mat4 = new Mat4();
        reflectMat.m00 = 1 - 2 * normal.x * normal.x;
        reflectMat.m01 = -2 * normal.x * normal.y;
        reflectMat.m02 = -2 * normal.x * normal.z;
        reflectMat.m03 = 0;

        reflectMat.m04 = -2 * normal.x * normal.y;
        reflectMat.m05 = 1 - 2 * normal.y * normal.y;
        reflectMat.m06 = -2 * normal.y * normal.z;
        reflectMat.m07 = 0;

        reflectMat.m08 = -2 * normal.x * normal.z;
        reflectMat.m09 = -2 * normal.y * normal.z;
        reflectMat.m10 = 1 - 2 * normal.z * normal.z;
        reflectMat.m11 = 0;

        reflectMat.m12 = -2 * d * normal.x;
        reflectMat.m13 = -2 * d * normal.y;
        reflectMat.m14 = -2 * d * normal.z;
        reflectMat.m15 = 1;

        this.rCamera.camera.matView.multiply(reflectMat);
        return reflectMat;
    }
}


