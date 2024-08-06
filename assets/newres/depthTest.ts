import { _decorator, Component, Node, MeshRenderer, v4 } from 'cc';
const { ccclass, property,executeInEditMode } = _decorator;

@ccclass('depthTest')
@executeInEditMode(true)
export class depthTest extends Component {
    @property(MeshRenderer)
    capsule: MeshRenderer = null;
    onLoad() {
        this.capsule.materials[0].setProperty('mainColor3', v4(1, 1, 0, 1));
    }

    update(deltaTime: number) {
        
    }
}



