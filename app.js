(() => {
    const view = document.querySelector('#app-view');
    let modules = {};
    
    /**
     * @function
     * @desc fetches module's list for navigation verification
     */
    function getModules() {
        return fetch('/module-list.json')
        .then(resp => resp.json())
        .then(resp=>{
            modules = resp;
        });
    }
    
    /**
     * @function
     * @desc handles navigation - module loading based
     */
    function onNavChange() {
        let moduleName = location.hash.replace('#', '');

        if(!modules[moduleName]) {
            console.error('404: Module not found');
            console.info('Redirecting to default module');
            moduleName = 'default';
        }

        view.setAttribute('src', `/app-modules/${ moduleName }/index.html`);
    }

    /**
     * @function
     * @desc app initialization (loading modules, binding events etc...)
     */
    (function init() {
        // load modules and then look up for custom navigation if any
        getModules().then ( () => {
            onNavChange();
        })
        
        // on navigation change
        window.addEventListener('hashchange', onNavChange, false);
    })();

})();