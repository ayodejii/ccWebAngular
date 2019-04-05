(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'speakers';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('app').controller(controllerId,
        ['common', 'datacontext', speakers]);

    function speakers(common, datacontext) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        // Bindable properties and functions are placed on vm.
        vm.speakers = [];
        vm.title = 'Speakers';
        vm.refresh = refresh;

        activate();

        function activate() {
            common.activateController([getSpeakers()], controllerId)
                .then(function () { log('Activated Speakers View'); });
        }

        function getSpeakers(forceRefresh) {
            return datacontext.getSpeakerPartials(forceRefresh).then(function (data) {
                return vm.speakers = data;
            });
        }

        function refresh() {
            getSpeakers(true);
        }

        //#region Internal Methods        

        //#endregion
    }
})();
