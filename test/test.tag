import riotOptTypesMixin, { optTypes } from '../src/riot-opt-types-mixin.js';

<test-primitive>
    <script type="babel">

        console.log('---->');
        console.log(riotOptTypesMixin);
        console.log(optTypes);

        this.on('mount', () => {
            console.log('mounted');
        });

        /*this.optTypes = {
            testopt: optTypes.bool.isRequired
        };*/
        this.mixin(riotOptTypesMixin);
    </script>
    <div>Test</div>
</test-primitive>
