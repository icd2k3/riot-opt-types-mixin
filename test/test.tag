import riotOptTypesMixin from '../lib/riot-opt-types-mixin.js';

<test-tag>
    <script type="babel">
        this.optTypes = opts.optTypes;
        this.mixin(riotOptTypesMixin);
        this.riotOptTypesMixinErrors = this.getRiotOptTypesMixinErrors();
    </script>
    <div>Test</div>
</test-tag>
