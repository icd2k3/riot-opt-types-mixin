import riotOptTypesMixin, { optTypes } from '../src/riot-opt-types-mixin.js';

<test-primitive>
    <script type="babel">

        console.log('---->');
        console.log(opts);
        console.log(opts.testopt);
        console.log('-------<');
        //console.log(optTypes);

        /*this.optTypes = {
            testopt: optTypes.bool.isRequired
        };*/
        this.mixin(riotOptTypesMixin);
    </script>
    <div>Test</div>
</test-primitive>
