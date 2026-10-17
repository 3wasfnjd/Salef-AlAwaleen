import * as THREE from 'three';
import { loadStaticModel, skyDome } from './assets';

export type EnvironmentId = 'majlis' | 'fereej' | 'barr';
export const ENVIRONMENTS: EnvironmentId[] = ['majlis', 'fereej', 'barr'];

interface Placement {
  path: string;
  position: [number, number, number];
  rotationY?: number;
  scale?: number;
}

interface Layout {
  sky: string;
  ground?: string;
  /** Warm point lights (e.g. a lantern), position relative to the elder. */
  lamps?: Array<[number, number, number]>;
  models: Placement[];
}

/**
 * The elder always sits at the stage origin facing +Z; each environment is
 * laid out around that spot. Models are the owner's Mafateeh assets
 * (see public/models/CREDITS.md). Loaded lazily the first time they are shown.
 */
const LAYOUTS: Record<Exclude<EnvironmentId, 'majlis'>, Layout> = {
  // Old Najdi neighbourhood: Diriyah-style courtyard, towers, well, palms.
  fereej: {
    sky: 'models/world/sky_morning.jpg',
    models: [
      { path: 'models/world/courtyard.glb', position: [0, 0, 0] },
      { path: 'models/world/tower.glb', position: [-9, 0, -14], rotationY: 0.4 },
      { path: 'models/world/tower.glb', position: [11, 0, -12], rotationY: -0.3 },
      { path: 'models/world/well.glb', position: [3.2, 0, -2.4], rotationY: 0.6 },
      { path: 'models/world/palm.glb', position: [-3.5, 0, -3.5], scale: 0.9 },
    ],
  },
  // Desert camp: the elder sits in front of his بيت شعر.
  barr: {
    sky: 'models/world/sky_morning.jpg',
    ground: '#d6ae78',
    lamps: [[-1.0, 0.45, 0.1]],
    models: [
      { path: 'models/world/tent.glb', position: [0, 0, -3.4] },
      { path: 'models/world/lantern.glb', position: [-1.0, 0, 0.1], scale: 0.8 },
      { path: 'models/world/camel_kneeling.glb', position: [4.2, 0, -1.5], rotationY: -1.9, scale: 0.75 },
      { path: 'models/world/camel_standing.glb', position: [6.5, 0, -5.5], rotationY: 2.4, scale: 0.65 },
      { path: 'models/world/sheep.glb', position: [-4.5, 0, -0.5], rotationY: 1.2, scale: 0.7 },
      { path: 'models/world/sheep.glb', position: [-5.4, 0, 0.6], rotationY: 0.6, scale: 0.7 },
      { path: 'models/world/palm.glb', position: [-7, 0, -7], scale: 1.1 },
      { path: 'models/world/palm.glb', position: [8, 0, -10], rotationY: 1.3 },
    ],
  },
};

/**
 * Holds one group per environment under a shared root that is shown in VR
 * and hidden in MR. Switching is instant after the first load.
 */
export class EnvironmentManager {
  readonly root = new THREE.Group();
  private readonly groups = new Map<EnvironmentId, Promise<THREE.Group>>();
  private currentId: EnvironmentId = 'majlis';

  constructor(majlis: THREE.Group) {
    this.root.name = 'environments';
    this.root.add(majlis);
    this.groups.set('majlis', Promise.resolve(majlis));
  }

  get current(): EnvironmentId {
    return this.currentId;
  }

  async show(id: EnvironmentId): Promise<void> {
    this.currentId = id;
    let pending = this.groups.get(id);
    if (!pending) {
      pending = this.build(id as Exclude<EnvironmentId, 'majlis'>);
      this.groups.set(id, pending);
    }
    const group = await pending;
    if (this.currentId !== id) return; // another switch happened while loading
    for (const [other, p] of this.groups) void p.then((g) => (g.visible = other === id));
    group.visible = true;
  }

  private async build(id: Exclude<EnvironmentId, 'majlis'>): Promise<THREE.Group> {
    const layout = LAYOUTS[id];
    const group = new THREE.Group();
    group.name = `env-${id}`;
    group.visible = false;
    this.root.add(group);
    group.add(skyDome(layout.sky));
    if (layout.ground) {
      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(55, 48).rotateX(-Math.PI / 2),
        new THREE.MeshLambertMaterial({ color: layout.ground }),
      );
      ground.position.y = -0.01;
      group.add(ground);
    }
    for (const position of layout.lamps ?? []) {
      const lamp = new THREE.PointLight('#ff9f45', 2.2, 5, 1.6);
      lamp.position.set(...position);
      group.add(lamp);
    }
    const models = await Promise.all(layout.models.map((m) => loadStaticModel(m.path)));
    layout.models.forEach((m, i) => {
      const model = models[i];
      model.position.set(...m.position);
      model.rotation.y = m.rotationY ?? 0;
      model.scale.setScalar(m.scale ?? 1);
      group.add(model);
    });
    return group;
  }
}
