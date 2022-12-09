import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'rawre/tests/helpers';

module('Acceptance | songs', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /songs', async function (assert) {
    await visit('/songs');

    assert.strictEqual(currentURL(), '/songs');
  });
});
