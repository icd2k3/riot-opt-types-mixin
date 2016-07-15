export default {
    init: function init() {
        const tagName = this.opts.dataIs;

        if (!this.optTypes) {
            console.error(
                `optTypes object was not set in the tag <${tagName}> and is expected when using the mixin riot-opt-types-mixin.`
            );
        }

        if (this.defaultOptTypes) {
            this.opts = Object.assign({}, this.opts, this.defaultOptTypes);
        }

        let prevOpts;

        this.on('updated', function updated() {
            if (prevOpts && JSON.stringify(prevOpts) === JSON.stringify(this.opts)) {
                return;
            }

            prevOpts = Object.assign({}, this.opts);

            for (const key in this.optTypes) {
                const error = this.optTypes[key](this.opts, key, tagName);

                if (error) {
                    console.error(error);
                }
            }
        });
    }
};

function getOptType(optValue) {
    const optType = typeof optValue;

    if (Array.isArray(optValue)) {
        return 'array';
    }
    if (optValue instanceof RegExp) {
        return 'object';
    }
    return optType;
}

function getPreciseType(optValue) {
    const optType = getOptType(optValue);

    if (optType === 'object') {
        if (optValue instanceof Date) {
            return 'date';
        } else if (optValue instanceof RegExp) {
            return 'regexp';
        }
    }
    return optType;
}

function createChainableTypeChecker(validate) {
    function checkType(
        isRequired,
        opts,
        optName,
        tagName
    ) {
        if (opts[optName] === null || opts[optName] === undefined) {
            if (isRequired) {
                return new Error(
                    `Required opt \`${optName}\` was not specified in `
                    + `\`${tagName}\`.`
                );
            }
            return null;
        }

        return validate(
            opts,
            optName,
            tagName
        );
    }

    const chainedCheckType = checkType.bind(null, false);

    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
}

function createPrimitiveTypeChecker(expectedType) {

    console.log('create');
    function validate(
        opts,
        optName,
        tagName
    ) {
        const optValue = opts[optName],
            optType = getOptType(optValue);

        if (optType !== expectedType) {
            const preciseType = getPreciseType(optValue);

            return new Error(
                `Invalid opt \`${optName}\` of type `
                + `\`${preciseType}\` supplied to \`${tagName}\`, expected `
                + `\`${expectedType}\`.`
            );
        }
        return null;
    }
    return createChainableTypeChecker(validate);
}

function createShapeTypeChecker(shapeTypes) {
    function validate(
        opts,
        optName,
        tagName
    ) {
        const optValue = opts[optName],
            optType = getOptType(optValue);

        if (optType !== 'object') {
            return new Error(
                `Invalid opt \`${optName}\` of type \`${optType}\` `
                + `supplied to \`${tagName}\`, expected \`object\`.`
            );
        }

        for (const key in shapeTypes) {
            const checker = shapeTypes[key],
                error = checker(
                    optValue,
                    key,
                    tagName
                );

            if (error) {
                return error;
            }
        }
        return null;
    }
    return createChainableTypeChecker(validate);
}

function createOneOfTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
        console.error('Invalid argument supplied to oneOf, expected an instance of array.');
    }

    function validate(
        opts,
        optName,
        tagName
    ) {
        const optValue = opts[optName],
            valuesString = JSON.stringify(expectedValues);

        for (let i = 0; i < expectedValues.length; i++) {
            if (Object.is(optValue, expectedValues[i])) {
                return null;
            }
        }

        return new Error(
            `Invalid opt \`${optName}\` of value \`${optValue}\` `
            + `supplied to \`${tagName}\`, expected one of ${valuesString}.`
        );
    }
    return createChainableTypeChecker(validate);
}

export const optTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    oneOf: createOneOfTypeChecker,
    shape: createShapeTypeChecker,
    string: createPrimitiveTypeChecker('string')
};
