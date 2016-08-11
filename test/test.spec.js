import { optTypes } from '../lib/riot-opt-types-mixin.js';
import './test.tag';

describe('riot-opt-types-mixin tests', () => {
    const createError = (str) => {
            return new Error(str).toString();
        },
        mockIsRequiredError = (optName) => {
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
        mockInvalidOptTypeNotationError = (optName, type) => {
            return new Error(
                `Property \`${optName}\` of component \`test-tag\` has invalid optType notation inside ${type}.`
            ).toString();
        },
        logAllErrors = (expectedErrors) => {
            const riotOptTypesMixinErrors = tag.getRiotOptTypesMixinErrors();

            for (let i=0; i<riotOptTypesMixinErrors.length; i++) {
                if (expectedErrors) {
                    console.log(`\nExpected: ${expectedErrors[i]}\nReceived: ${riotOptTypesMixinErrors[i]}\n`);
                } else {
                    console.log(riotOptTypesMixinErrors[i]);
                }
            }
        },
        validateErrors = (logErrors) => {
            const riotOptTypesMixinErrors = tag.getRiotOptTypesMixinErrors();

            if (logErrors) {
                logAllErrors(expectedErrors);
            }

            expect(riotOptTypesMixinErrors.length, 'actual errors length should equal expected errors length')
                .to.equal(expectedErrors.length);

            for (let i=0; i<riotOptTypesMixinErrors.length; i++) {
                const err = riotOptTypesMixinErrors[i].toString(),
                    expectedErr = expectedErrors[i].toString();

                expect(err).to.deep.equal(expectedErr);
            }
        };

    class TestInstance {};

    let tagDom,
        tag,
        expectedErrors;

    beforeEach(() => {
        expectedErrors = null;
        tagDom = document.createElement('div');
        document.body.appendChild(tagDom);
    });

    afterEach(() => {
        if (tag) {
            tag.unmount();
        }
    });

    it('should display error if opts are passed to the tag that are NOT defined in optTypes', (done) => {
        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {},
            testMissing: 'testMissing'
        })[0];

        expect(tag.getRiotOptTypesMixinErrors()[0].toString(), 'expect error if tag is passed an opt that is not in optTypes')
            .to.equal(new Error(`Opt \`testMissing\` was passed to tag \`test-tag\`, but was not defined in \`optTypes\` object.`).toString());

        done();
    });

    it('should display no errors if all opts are passed as expected', (done) => {
        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {
                anyTest: optTypes.any.isRequired,
                arrayOfTest: optTypes.arrayOf(optTypes.number).isRequired,
                arrayTest: optTypes.array.isRequired,
                boolTest: optTypes.bool.isRequired,
                funcTest: optTypes.func.isRequired,
                instanceOfTest: optTypes.instanceOf(TestInstance).isRequired,
                numberTest: optTypes.number.isRequired,
                objectOfTest: optTypes.objectOf(optTypes.number).isRequired,
                objectTest: optTypes.object.isRequired,
                oneOfTest: optTypes.oneOf(['mock']).isRequired,
                oneOfTypeTest: optTypes.oneOfType([optTypes.number, optTypes.string]).isRequired,
                shapeTest: optTypes.shape({mock: optTypes.string.isRequired}).isRequired,
                stringTest: optTypes.string.isRequired,
                symbolTest: optTypes.symbol.isRequired
            },
            anyTest: 'mock',
            arrayOfTest: [1],
            arrayTest: ['mock'],
            boolTest: true,
            funcTest: () => {},
            instanceOfTest: new TestInstance(),
            numberTest: 1,
            objectOfTest: {mock: 1},
            objectTest: {},
            oneOfTest: 'mock',
            oneOfTypeTest: 'mock',
            shapeTest: {mock: 'mock'},
            stringTest: 'mock',
            symbolTest: Symbol('symbol')
        })[0];

        expect(tag.getRiotOptTypesMixinErrors(), 'no errors expected')
            .to.equal(null);

        done();
    });

    it('should display errors if opts are required, but not provided to the tag from parent', (done) => {
        expectedErrors = [
            mockIsRequiredError('anyTest'),
            mockIsRequiredError('arrayOfTest'),
            mockIsRequiredError('arrayTest'),
            mockIsRequiredError('boolTest'),
            mockIsRequiredError('funcTest'),
            mockIsRequiredError('instanceOfTest'),
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
                numberTest: optTypes.number.isRequired,
                objectOfTest: optTypes.objectOf(optTypes.number).isRequired,
                objectTest: optTypes.object.isRequired,
                oneOfTest: optTypes.oneOf(['mock']).isRequired,
                oneOfTypeTest: optTypes.oneOfType([optTypes.number, optTypes.string]).isRequired,
                shapeTest: optTypes.shape({mock: optTypes.string.isRequired}).isRequired,
                stringTest: optTypes.string.isRequired
            }
        })[0];

        validateErrors();

        done();
    });

    it('should display errors if opts are optional, but passed incorrectly', (done) => {
        expectedErrors = [
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

        validateErrors();

        done();
    });

    it('should display errors for invalid nested optTypes', (done) => {
        expectedErrors = [
            mockInvalidTypeError('arrayOfTest[0]', 'string', 'number'),
            mockInvalidTypeError('objectOfTest.mock', 'string', 'number'),
            mockInvalidTypeError('shapeTest.shapeNestedTest', 'boolean', 'string')
        ];

        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {
                arrayOfTest: optTypes.arrayOf(optTypes.number),
                objectOfTest: optTypes.objectOf(optTypes.number),
                shapeTest: optTypes.shape({
                    shapeNestedTest: optTypes.string.isRequired
                }).isRequired
            },
            arrayOfTest: ['mock'],
            objectOfTest: {
                mock: 'mock'
            },
            shapeTest: {
                shapeNestedTest: false
            }
        })[0];

        validateErrors();

        done();
    });

    it('should return invalid optType errors if passed incorrectly', (done) => {
        expectedErrors = [
            mockInvalidOptTypeNotationError('arrayOfTest', 'arrayOf'),
            mockInvalidOptTypeNotationError('objectOfTest', 'objectOf'),
            new Error('Invalid argument supplied to oneOf, expected an instance of array.').toString(),
            new Error('Invalid argument supplied to oneOfType, expected an instance of array.').toString()
        ];

        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {
                arrayOfTest: optTypes.arrayOf({invalid: 'notation'}),
                objectOfTest: optTypes.objectOf({invalid: 'notation'}),
                oneOfTest: optTypes.oneOf({invalid: 'notation'}),
                oneOfTypeTest: optTypes.oneOfType({invalid: 'notation'})
            },
            arrayOfTest: ['mock'],
            objectOfTest: {mock: 'mock'},
            oneOfTest: 'mock',
            oneOfTypeTest: 'mock'
        })[0];

        validateErrors();

        done();
    });

    it('should re-validate if updated and opts have changed', (done) => {
        expectedErrors = [
            mockInvalidTypeError('stringTest', 'array', 'string')
        ];

        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {
                stringTest: optTypes.string.isRequired
            },
            stringTest: []
        })[0];

        validateErrors();

        expectedErrors = [
            mockInvalidTypeError('stringTest', 'boolean', 'string')
        ];

        tag.opts = Object.assign({}, tag.opts, {
            stringTest: false
        });
        tag.update();

        validateErrors();

        done();
    });

    it('should display precice type (date & regexp) for objects', (done) => {
        expectedErrors = [
            mockInvalidTypeError('boolTest', 'date', 'boolean'),
            mockInvalidTypeError('stringTest', 'regexp', 'string')
        ];

        tag = riot.mount(tagDom, 'test-tag', {
            optTypes: {
                boolTest: optTypes.bool,
                stringTest: optTypes.string
            },
            boolTest: new Date(),
            stringTest: new RegExp(/testregexp/g)
        })[0];

        validateErrors();

        done();
    });
});
