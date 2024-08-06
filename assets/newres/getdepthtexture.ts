import { _decorator, Component, Node, RenderTexture, MeshRenderer, director, Sprite, SpriteFrame, Texture2D, input, Input, EventTouch, geometry, Camera, PhysicsSystem, Vec3, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('getdepthtexture')
export class getdepthtexture extends Component {
    @property(RenderTexture)
    renderTexture:RenderTexture;

    @property(Camera)
    camera:Camera = null;

    @property
    samplerName:string = '';

    @property(Sprite)
    sp:Sprite = null;

    start() {
        let material = this.node.getComponent(MeshRenderer).material;
        material.setProperty(this.samplerName, this.renderTexture.window.framebuffer.depthStencilTexture);
        let pass0 = material.passes[0];
        let bindingIndex = pass0.getBinding(this.samplerName);
        pass0.bindTexture(bindingIndex, this.renderTexture.window.framebuffer.depthStencilTexture);
        pass0.bindSampler(bindingIndex, director.root.pipeline.globalDSManager.pointSampler);

        // var temp = document.createElement("a");
        // temp.download = 'test.png';
        // temp.href = URL.createObjectURL(new Blob([this.renderTexture.readPixels(0, 0, 1280, 960)]));
        // temp.click();
        // document.removeChild(temp)

        // let spriteFrame = new SpriteFrame();
        // let tex = new Texture2D();
        // spriteFrame.texture = this.renderTexture.window.framebuffer.depthStencilTexture;

        // this.sp.spriteFrame 

        input.on(Input.EventType.TOUCH_START, this.touchstart.bind(this), this.node);
        input.on(Input.EventType.TOUCH_MOVE, this.tuouchmove.bind(this), this.node);
        input.on(Input.EventType.TOUCH_END, this.touchend.bind(this), this.node);
    }

    curObj:Node = null;
    curPos:Vec3 = new Vec3();
    touchstart(e:EventTouch){
        console.log('touch start');
        let tempV2 = e.getLocation();
        let ray = new geometry.Ray();
        this.camera.screenPointToRay(tempV2.x, tempV2.y, ray);
        if(PhysicsSystem.instance.raycastClosest(ray, PhysicsSystem.PhysicsGroup.DEFAULT)){
            let res = PhysicsSystem.instance.raycastClosestResult;
            this.curObj = res.collider.node;
            this.curPos = this.curObj.worldPosition.clone();
            console.log(`touch move pos ${res.hitPoint}`);
            this.node.worldPosition = res.hitPoint;
        }
    }

    tuouchmove(e:EventTouch){
        console.log('touch move');
        // if(this.curObj){
        //     let wp = this.camera.screenToWorld(new Vec3(e.getLocation().x, e.getLocation().y, 0.0));
        //     console.log(`touch move pos ${wp}`);
        //     this.node.worldPosition = v3(wp.x, this.curPos.y, wp.z);
        // }

        let tempV2 = e.getLocation();
        let ray = new geometry.Ray();
        this.camera.screenPointToRay(tempV2.x, tempV2.y, ray);
        if(PhysicsSystem.instance.raycastClosest(ray, PhysicsSystem.PhysicsGroup.DEFAULT)){
            let res = PhysicsSystem.instance.raycastClosestResult;
            this.curObj = res.collider.node;
            this.curPos = this.curObj.worldPosition.clone();
            console.log(`touch move pos ${res.hitPoint}`);
            this.node.worldPosition = res.hitPoint.add(v3(0, 0, 0.3));
        }
    }

    touchend(){
        console.log('touch end');
        this.curObj = null;
    }
}


