import { optTypes } from '../lib/riot-opt-types-mixin.js';
import './test.tag';

describe('riot-opt-types-mixin tests', () => {
    const mockIsRequiredError = (optName) => {
            return new Error(
                `Required opt \`${optName}\` was not specified in `
                + `\`test-tag\`.`
            ).toString();
        },
        mockInvalidTypeError = (optName, type, expectedType) => {
            return new Error(
                `Invalid opt \`${optName}\` of type \`${type}\` supplied to \`test-tag\`, expected \`${expectedType}\`.`
            ).toString();
        },
        mockInvalidArrayOfError = (optName, type) => {
            return new Error(
                `Invalid opt \`${optName}\` of type \`${type}\` supplied to \`test-tag\`, expected an array.`
            ).toString();
        },
        mockInvalidObjectOfError = (optName, type) => {
            return new Error(
                `Invalid opt \`${optName}\` of type \`${type}\` supplied to \`test-tag\`, expected an object.`
            ).toString();
        },
        mockInvalidOneOfError = (optName, value, expectedValues) => {
            return new Error(
                `Invalid opt \`${optName}\` of value \`${value}\` supplied to \`test-tag\`, expected one of ${expectedValues}.`
            ).toString();
        },
        mockInvalidInstanceTypeError = (optName, type, expectedType) => {
            return new Error(
                `Invalid opt \`${optName}\` of type \`${type}\` supplied to \`test-tag\`, expected instance of \`${expectedType}\`.`
            ).toString();
        },
        mockInvalidOneOfTypeError = (optName) => {
            return new Error(
                `Invalid opt \`${optName}\` supplied to \`test-tag\`.`
            ).toString();
        },
        logAllErrors = (expectedErrors) => {
            for (let i=0; i<tag.riotOptTypesMixinErrors.length; i++) {
                if (expectedErrors) {
                    console.log(`\nExpected: ${expectedErrors[i]}\nReceived: ${tag.riotOptTypesMixinErrors[i]}\n`);
                } else {
                    console.log(tag.riotOptTypesMixinErrors[i]);
                }
            }
        };

    class TestInstance {};

    let tagDom,
        tag

    beforeEach(() => {
        tagDom = document.createElement('div');
        document.body.appendChild(tagDom);
    });

    afterEach(() => {
        if (tag) {
            tag.unmount();
        }
    });

    it('Should display error if mixin is instantiated, but optTypes is missing', (done) => {
        tag = riot.mount(tagDom, 'test-tag', {})[0];

        expect(tag.riotOptTypesMixinErrors[0], 'expect error if tag is passed an opt that is not in optTypes')
            .to.equal(new Error(
                `optTypes object was not set in the tag <test-tag> `
                + 'and is expected when using the mixin riot-opt-types-mixin.'
            ).toString());

        done();
    });

    it('Should display error if opts are passed to the tag that are NOT defined in optTypes', (done) => {
        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {},
            testMissing: 'testMissing'
        })[0];

        expect(tag.riotOptTypesMixinErrors[0], 'expect error if tag is passed an opt that is not in optTypes')
            .to.equal(new Error(`opt 'testMissing' was not defined in <test-tag>'s optTypes config.`).toString());

        done();
    });

    it('Should display no errors if all opts are passed as expected', (done) => {
        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {
                anyTest: optTypes.any.isRequired,
                arrayOfTest: optTypes.arrayOf(optTypes.number).isRequired,
                arrayTest: optTypes.array.isRequired,
                boolTest: optTypes.bool.isRequired,
                funcTest: optTypes.func.isRequired,
                instanceOfTest: optTypes.instanceOf(TestInstance).isRequired,
                nodeTest: optTypes.node.isRequired,
                numberTest: optTypes.number.isRequired,
                objectOfTest: optTypes.objectOf(optTypes.number).isRequired,
                objectTest: optTypes.object.isRequired,
                oneOfTest: optTypes.oneOf(['mock']).isRequired,
                oneOfTypeTest: optTypes.oneOfType([optTypes.number, optTypes.string]).isRequired,
                shapeTest: optTypes.shape({mock: optTypes.string.isRequired}).isRequired,
                stringTest: optTypes.string.isRequired
            },
            anyTest: 'mock',
            arrayOfTest: [1],
            arrayTest: ['mock'],
            boolTest: true,
            funcTest: () => {},
            instanceOfTest: new TestInstance(),
            nodeTest: 'mock',
            numberTest: 1,
            objectOfTest: {mock: 1},
            objectTest: {},
            oneOfTest: 'mock',
            oneOfTypeTest: 'mock',
            shapeTest: {mock: 'mock'},
            stringTest: 'mock'
        })[0];

        expect(tag.riotOptTypesMixinErrors, 'no errors expected')
            .to.equal(null);

        done();
    });

    it('Should display errors if opts are required, but not provided to the tag from parent', (done) => {
        const expectedErrors = [
            mockIsRequiredError('anyTest'),
            mockIsRequiredError('arrayOfTest'),
            mockIsRequiredError('arrayTest'),
            mockIsRequiredError('boolTest'),
            mockIsRequiredError('funcTest'),
            mockIsRequiredError('instanceOfTest'),
            mockIsRequiredError('nodeTest'),
            mockIsRequiredError('numberTest'),
            mockIsRequiredError('objectOfTest'),
            mockIsRequiredError('objectTest'),
            mockIsRequiredError('oneOfTest'),
            mockIsRequiredError('oneOfTypeTest'),
            mockIsRequiredError('shapeTest'),
            mockIsRequiredError('stringTest')
        ];

        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {
                anyTest: optTypes.any.isRequired,
                arrayOfTest: optTypes.arrayOf(optTypes.number).isRequired,
                arrayTest: optTypes.array.isRequired,
                boolTest: optTypes.bool.isRequired,
                funcTest: optTypes.func.isRequired,
                instanceOfTest: optTypes.instanceOf(TestInstance).isRequired,
                nodeTest: optTypes.node.isRequired,
                numberTest: optTypes.number.isRequired,
                objectOfTest: optTypes.objectOf(optTypes.number).isRequired,
                objectTest: optTypes.object.isRequired,
                oneOfTest: optTypes.oneOf(['mock']).isRequired,
                oneOfTypeTest: optTypes.oneOfType([optTypes.number, optTypes.string]).isRequired,
                shapeTest: optTypes.shape({mock: optTypes.string.isRequired}).isRequired,
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

    it('Should display errors if opts are optional, but passed incorrectly', (done) => {
        const expectedErrors = [
            mockInvalidArrayOfError('arrayOfTest', 'string'),
            mockInvalidTypeError('arrayTest', 'boolean', 'array'),
            mockInvalidTypeError('boolTest', 'string', 'boolean'),
            mockInvalidTypeError('funcTest', 'boolean', 'function'),
            mockInvalidInstanceTypeError('instanceOfTest', 'String', 'TestInstance'),
            mockInvalidTypeError('numberTest', 'string', 'number'),
            mockInvalidObjectOfError('objectOfTest', 'array'),
            mockInvalidTypeError('objectTest', 'boolean', 'object'),
            mockInvalidOneOfError('oneOfTest', 'not-mock', '["mock"]'),
            mockInvalidOneOfTypeError('oneOfTypeTest'),
            mockInvalidTypeError('shapeTest', 'string', 'object'),
            mockInvalidTypeError('stringTest', 'array', 'string')
        ];

        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {
                arrayOfTest: optTypes.arrayOf(optTypes.number),
                arrayTest: optTypes.array,
                boolTest: optTypes.bool,
                funcTest: optTypes.func,
                instanceOfTest: optTypes.instanceOf(TestInstance),
                numberTest: optTypes.number,
                objectOfTest: optTypes.objectOf(optTypes.number),
                objectTest: optTypes.object,
                oneOfTest: optTypes.oneOf(['mock']),
                oneOfTypeTest: optTypes.oneOfType([optTypes.number, optTypes.string]),
                shapeTest: optTypes.shape({mock: optTypes.string}),
                stringTest: optTypes.string
            },
            arrayOfTest: 'mock',
            arrayTest: false,
            boolTest: 'mock',
            funcTest: false,
            instanceOfTest: 'mock',
            numberTest: 'mock',
            objectOfTest: [],
            objectTest: true,
            oneOfTest: 'not-mock',
            oneOfTypeTest: true,
            shapeTest: 'not-shape',
            stringTest: []
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
