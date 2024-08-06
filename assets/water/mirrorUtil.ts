import { _decorator, Component, Node, Vec3, v3, Mat4 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('mirrorUtil')
export class mirrorUtil {
    static getMirrorPoint(out:Vec3, p:Vec3, n:Vec3, d:number):Vec3{
        if(out == null){
            out = new Vec3();
        }
        let dist = Vec3.dot(p, n) - d;
        //tem = N;
        let tmp = v3(n);
        tmp.multiplyScalar(2.0 * dist);
        //out = p - 2.0 * dist * N;
        Vec3.subtract(out, p, tmp);
        return out;
    }

    static getMirrorMat4(out:Mat4, n:Vec3, p:Vec3){

    }
}


