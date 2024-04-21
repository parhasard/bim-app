// import * as THREE from 'three';
import * as OBC from "openbim-components";

export default class ThreeScene {
  private onSelectionChanged: (property: any) => void;
  private components: OBC.Components;
  private container: HTMLElement;
  private grid: OBC.SimpleGrid | null;
  private fragments: OBC.FragmentManager | null;
  public ifcLoader: OBC.FragmentIfcLoader;
  private mainToolbar: OBC.Toolbar;
  private ifcButton: OBC.UIElement<any> | null;
  private highlighter: OBC.FragmentHighlighter;
  private culler: OBC.ScreenCuller;
  private propertiesProcessor: OBC.IfcPropertiesProcessor;
  private renderer: OBC.PostproductionRenderer;
  private camera: OBC.SimpleCamera;
  private ifcModel: any;

  constructor(container: HTMLElement) {
    this.container = container;
    this.components = new OBC.Components();

    this.components.scene = new OBC.SimpleScene(this.components);
    this.components.scene.setup();
    this.renderer = new OBC.PostproductionRenderer(this.components, container);
    this.components.renderer = this.renderer;
    this.camera = new OBC.SimpleCamera(this.components);
    this.components.camera = this.camera;
    this.components.raycaster = new OBC.SimpleRaycaster(this.components);
    this.components.init();

    this.grid = null;
    this.fragments = new OBC.FragmentManager(this.components);
    this.ifcLoader = new OBC.FragmentIfcLoader(this.components);
    this.mainToolbar = new OBC.Toolbar(this.components, {
      name: "Main Toolbar",
      position: "bottom",
    });
    this.ifcButton = null;
    this.highlighter = new OBC.FragmentHighlighter(this.components);
    this.culler = new OBC.ScreenCuller(this.components);
    this.propertiesProcessor = new OBC.IfcPropertiesProcessor(this.components);
  }

  private async setupScene() {
    await this.culler.setup();
    await this.highlighter.setup();
  }

  private addGrid() {
    this.grid = new OBC.SimpleGrid(this.components);
  }
  private configureLoader() {
    this.ifcLoader.settings.wasm = {
      path: "https://unpkg.com/web-ifc@0.0.46/",
      absolute: true,
    };
    this.ifcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
    this.ifcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;
  }

  private setupToolbar() {
    this.ifcButton = this.ifcLoader.uiElement.get("main");
    this.mainToolbar.addChild(this.ifcButton);
    this.components.ui.addToolbar(this.mainToolbar);
  }
  public getProperty(model, expressID) {
    const property = this.propertiesProcessor.getProperties(model, expressID);
    return property[0];
  }

  public setSelectionChangedCallback(callback: (property: any) => void) {
    this.onSelectionChanged = callback;
  }

  public onLoad() {
    this.ifcLoader?.onIfcLoaded.add(async (model) => {
      for (const fragment of model.items) {
        this.culler.add(fragment.mesh);
      }
      this.propertiesProcessor.process(model);
      this.ifcModel = model;
      this.highlighter.events.select.onHighlight.add((selection) => {
        const fragmentID = Object.keys(selection)[0];

        const expressID = Number([...selection[fragmentID]][0]);
        this.propertiesProcessor.renderProperties(model, expressID);
        const property = this.getProperty(model, expressID);
        if (this.onSelectionChanged) {
            this.onSelectionChanged(property);
          }
        
      });
      this.highlighter.update();
      this.culler.needsUpdate = true;
    });
  }

  public initScene() {
    this.components.init();
    this.setupScene();
    this.addGrid();
    this.configureLoader();
    this.renderer.postproduction.enabled = true;
    this.setupToolbar();
    this.onLoad()
  }
  public updateSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.components.camera.aspect = width / height;
    this.components.camera.updateProjectionMatrix();
    this.components.renderer.setSize(width, height);
  }
}
