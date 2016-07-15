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

    it('Example', (done) => {
        tag = riot.mount(tagDom, 'test-primitive', { testbool: null })[0];
    });
});
