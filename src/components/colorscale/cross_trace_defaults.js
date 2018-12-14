/**
* Copyright 2012-2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var Lib = require('../../lib');

module.exports = function crossTraceDefaults(fullData) {
    var cont;

    function replace(k) {
        var val = cont['_' + k];
        if(val !== undefined) {
            cont[k] = val;
        }
    }

    for(var i = 0; i < fullData.length; i++) {
        var trace = fullData[i];
        var _module = trace._module;

        // TODO should be _module.colorscale?
        // _module.colorscale does not cover marker.line and line colorscales
        // that don't support colorbars
        var cAttrs = _module.colorbar;

        if(cAttrs) {
            cont = cAttrs.container ?
                Lib.nestedProperty(trace, cAttrs.container).get() :
                trace;

            if(cont) {
                var isAuto = cont.zauto || cont.cauto;
                var minAttr = cAttrs.min;
                var maxAttr = cAttrs.max;

                if(isAuto || cont[minAttr] === undefined) {
                    replace(minAttr);
                }
                if(isAuto || cont[maxAttr] === undefined) {
                    replace(maxAttr);
                }
                if(cont.autocolorscale) {
                    replace('colorscale');
                }
            }
        }
    }
};
