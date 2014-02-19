var juntarObj = (function() {
    "use strict";

    var _copiaRecursiva = function(origem, destino, copias) {
        copias = copias || [];
        var propriedade, valor, strArray;
        destino = destino || {};
        strArray = ({}).toString.call([]);
        copias.push(origem);
        for (propriedade in origem) {
            if (!({}).hasOwnProperty.call(origem, propriedade)) {
                continue;
            }
            valor = origem[propriedade];
            if (valor !== null && typeof valor === "object") {
                var jaCop = false;
                for (var i = 0, l = copias.length; i < l; i++) {
                    if (copias[i] === valor) {
                        jaCop = true;
                        break;
                    }
                }
                if (!jaCop) {
                    if (typeof destino[propriedade] === "undefined") {
                        destino[propriedade] = (({}).toString.call(valor) === strArray) ? [] : {};
                    }
                    copias.push(destino[propriedade]);
                    _copiaRecursiva(valor, destino[propriedade], copias);
                    continue;
                }
            }
            destino[propriedade] = valor;
        }
        return destino;
    };

    return function(objNovo) {
        objNovo = objNovo || {};
        for (var i = 1; i < arguments.length; i++) {
            _copiaRecursiva(arguments[i], objNovo);
        }
        return objNovo;
    };

})();