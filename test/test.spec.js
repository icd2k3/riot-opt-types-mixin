import { optTypes } from '../lib/riot-opt-types-mixin.js';
import './test.tag';

describe('riot-opt-types-mixin tests', () => {
    const getIsRequiredError = (optName) => {
        return new Error(
            `Required prop \`${optName}\` was not specified in `
            + `\`test-tag\`.`
        ).toString();
    };

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

    it('Should display no errors if all opts are passed as expected', (done) => {
        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {
                arrayTest: optTypes.array.isRequired,
                boolTest: optTypes.bool.isRequired,
                funcTest: optTypes.func.isRequired,
                numberTest: optTypes.number.isRequired,
                objectTest: optTypes.object.isRequired,
                oneOfTest: optTypes.oneOf(['mock']).isRequired,
                shapeTest: optTypes.shape({mock: optTypes.string.isRequired}).isRequired,
                stringTest: optTypes.string.isRequired
            },
            arrayTest: ['mock'],
            boolTest: true,
            funcTest: () => {},
            numberTest: 1,
            objectTest: {},
            oneOfTest: 'mock',
            shapeTest: {mock: 'mock'},
            stringTest: 'mock'
        })[0];

        expect(tag.riotOptTypesMixinErrors, 'no errors expected')
            .to.equal(null);

        done();
    });

    it('Should display errors if opts are required, but not provided to the tag from parent', (done) => {
        const expectedErrors = [
            getIsRequiredError('arrayTest'),
            getIsRequiredError('boolTest'),
            getIsRequiredError('funcTest'),
            getIsRequiredError('numberTest'),
            getIsRequiredError('objectTest'),
            getIsRequiredError('oneOfTest'),
            getIsRequiredError('shapeTest'),
            getIsRequiredError('stringTest')
        ];

        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {
                arrayTest: optTypes.array.isRequired,
                boolTest: optTypes.bool.isRequired,
                funcTest: optTypes.func.isRequired,
                numberTest: optTypes.number.isRequired,
                objectTest: optTypes.object.isRequired,
                oneOfTest: optTypes.oneOf(['mock']).isRequired,
                shapeTest: optTypes.shape({mock: 'mock'}).isRequired,
                stringTest: optTypes.string.isRequired
            }
        })[0];

        expect(tag.riotOptTypesMixinErrors.length, 'actual errors length should equal expected errors length')
            .to.equal(expectedErrors.length);

        for (let i=0; i<tag.riotOptTypesMixinErrors.length; i++) {
            const err = tag.riotOptTypesMixinErrors[i],
                expectedErr = expectedErrors[i];

            expect(err).to.deep.equal(expectedErr);
        }

        done();
    });
});
