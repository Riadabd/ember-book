import Route from '@ember/routing/route';

export default class BandsBandRoute extends Route {
  model(params) {
    // This route was generated with a dynamic segment. Implement data loading
    // based on that dynamic segment here in the model hook.
    let bands = this.modelFor('bands');
    return bands.find((band) => band.id == params.id);
  }
}
