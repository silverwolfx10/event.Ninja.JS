/**
 * $event
 * 
 * Modulo de delegação evento. Se você estiver familiarizado com jQuery, então ele
 * pode parecer familiar para você a funcao curry
 * 
 * @module $event
 * @author Cleber de Moraes Goncalves <cleber.programmer>
 * @example
 * 
 *        $event().on('body', 'click', funciton (e) {
 *          // code here ...
 *        });
 *
 */
this.Ninja.module('$event', ['$curry'], function ($curry, _) {
  
  /**
   * Modulo de delegacao de eventos
   * 
   * @public
   * @method $event
   * @param {Object} root Contexto raiz para o querySelectorAll, caso nao tenha passado ser utilizando o document
   * @return {Object} Objeto com os metodos para manipulacao de eventos
   * @example
   * 
   *        $event().on('body', 'click', funciton (e) {
   *          // code here ...
   *        });
   * 
   */
  function Event(root) {
  
    /**
     * Torna o Event auto instanciavel, evitando a necessidade do 'new' toda
     * vez que for utilizar o Event
     */
    if (!(this instanceof Event)) {
      return new Event(root);
    }
    
    /**
     * Seleciona todos os elemtnos que a query selecionar
     * 
     * @private
     * @method $
     * @param {String} query Seletor de elementos
     * @return {Array} Colecao com todos os elementos encontrado pela query
     * @example
     * 
     *        $('body');
     * 
     */
    function $(query) {
      return (root || document).querySelector(query);
    }
  
    /**
     * Seleciona um Node para aplicar ou remover eventos
     * 
     * @private
     * @method hook
     * @param {String} method nome dos eventos, podendo ser addEventListener ou removeEventListener
     * @param {String} query Seletor de elementos
     * @param {String} event Nome do evento que ser escultado ou deixara de ser escultado
     * @param {Functon} callback Funcao que sera executado quando o evento for disparado
     * @example
     * 
     *        hook('addEventListener', 'body', 'click', function () {});
     * 
     */
    function hook(method, query, event, callback) {
      $(query)[method](event, callback, false);
    }
    
    /**
     * Revelacao dos metodos da Class Event, encapsulando a visibilidade das funcoes
     * privadas
     */
    return {
      
      /**
       * Adiciona eventos, a funcao curry
       * 
       * @public
       * @method on
       * @param {String} method nome dos eventos, podendo ser addEventListener ou removeEventListener
       * @param {String} query Seletor de elementos
       * @param {String} event Nome do evento que ser escultado ou deixara de ser escultado
       * @param {Functon} callback Funcao que sera executado quando o evento for disparado
       * @example
       * 
       *        $event().on('addEventListener', 'body', function () {});
       * 
       */
      on: $curry(hook)('addEventListener'),
      
      /**
       * Remove eventos, a funcao curry
       * 
       * @public
       * @method on
       * @param {String} method nome dos eventos, podendo ser addEventListener ou removeEventListener
       * @param {String} query Seletor de elementos
       * @param {String} event Nome do evento que ser escultado ou deixara de ser escultado
       * @param {Functon} callback Funcao que sera executado quando o evento for disparado
       * @example
       * 
       *        $event().off('addEventListener', 'body', function () {});
       * 
       */
      off: $curry(hook)('removeEventListener')
      
    };
  
  }
  
  /**
   * Revelacao do modulo $event, encapsulando a visibilidade das funcoes
   * privadas
   */
  return Event;
    
});