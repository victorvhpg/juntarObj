/**
 * @victorvhpg 19/02/2014
 * https://github.com/victorvhpg/juntarObj
 * juntarObj: faz merge recursivo de vários objetos, inclusive com referencia circular
 *
 */

(function(global) {
    "use strict";
    var juntarObj = (function() {

        var _copiaRecursiva = function(copiaCadeiaPrototype, origem, destino, copias) {
            copias = copias || [];
            var propriedade, valor, strArray;
            destino = destino || {};
            strArray = ({}).toString.call([]);
            copias.push(origem);
            for (propriedade in origem) {
                if (!(({}).hasOwnProperty.call(origem, propriedade)) && !copiaCadeiaPrototype) {
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
                        _copiaRecursiva(copiaCadeiaPrototype, valor, destino[propriedade], copias);
                        continue;
                    }
                }
                destino[propriedade] = valor;
            }
            return destino;
        };


        return function(copiaCadeiaPrototype) {
            var i = 1;
            copiaCadeiaPrototype = arguments[0];
            if (typeof copiaCadeiaPrototype !== "boolean") {
                copiaCadeiaPrototype = true;
                i--;
            }
            var objNovo = {};
            for (; i < arguments.length; i++) {
                _copiaRecursiva(copiaCadeiaPrototype, arguments[i], objNovo);
            }
            return objNovo;
        };

    })();

    if (typeof define === "function" && define.amd) {
        define(function() {
            return juntarObj;
        });
    } else {
        global.juntarObj = juntarObj;
    }

})(this);