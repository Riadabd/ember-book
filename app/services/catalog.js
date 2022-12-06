import Service from '@ember/service';
import Band from 'rawre/models/band';
import Song from 'rawre/models/song';
import { tracked } from 'tracked-built-ins';

function extractRelationships(object) {
  let relationships = {};
  for (let relationshipName in object) {
    relationships[relationshipName] = object[relationshipName].links.related;
  }

  return relationships;
}

export default class CatalogService extends Service {
  storage = {};

  constructor() {
    super(...arguments);
    this.storage.bands = tracked([]);
    this.storage.songs = tracked([]);
  }

  async fetchAll(type) {
    if (type === 'bands') {
      let response = await fetch(
        'http://json-api.rockandrollwithemberjs.com/bands'
      );
      let json = await response.json();
      this.loadAll(json);
      return this.bands;
    } else if (type === 'songs') {
      let response = await fetch(
        'http://json-api.rockandrollwithemberjs.com/songs'
      );
      let json = await response.json();
      this.loadAll(json);
      return this.songs;
    }
  }

  loadAll(json) {
    let records = [];
    for (let item of json.data) {
      records.push(this._loadResources(item));
    }

    return records;
  }

  load(response) {
    return this._loadResources(response.data);
  }

  _loadResources(data) {
    let record;
    let { id, type, attributes, relationships } = data;
    if (type === 'bands') {
      let rels = extractRelationships(relationships);
      record = new Band({ id, ...attributes }, rels);
      this.add('band', record);
    } else if (type === 'songs') {
      let rels = extractRelationships(relationships);
      record = new Song({ id, ...attributes }, rels);
      this.add('song', record);
    }

    return record;
  }

  async create(type, attributes, relationships = {}) {
    let payload = {
      data: {
        type: type === 'band' ? 'bands' : 'songs',
        attributes,
        relationships,
      },
    };

    let response = await fetch(
      type === 'band'
        ? 'http://json-api.rockandrollwithemberjs.com/bands'
        : 'http://json-api.rockandrollwithemberjs.com/songs',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify(payload),
      }
    );

    let json = await response.json();
    return this.load(json);
  }

  add(type, record) {
    let collection = type === 'band' ? this.storage.bands : this.storage.songs;
    collection.push(record);
  }

  get bands() {
    return this.storage.bands;
  }

  get songs() {
    return this.storage.songs;
  }

  find(type, filterFn) {
    let collection = type === 'band' ? this.bands : this.songs;
    return collection.find(filterFn);
  }
}
