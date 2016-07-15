import './test.tag';

describe('riot-opt-types-mixin tests', () => {
    let tagDom,
        tag

    beforeEach(() => {
        tagDom = document.createElement('div');
        document.body.appendChild(tagDom);
    });

    afterEach(function() {
        if (tag) {
            tag.unmount();
        }
    })

    it('Should display error if opt is required, but not provided to the tag', (done) => {
        tag = riot.mount(tagDom, 'test-primitive', {testopt: 'aaa'})[0];
    });
});
