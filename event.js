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
  function Event(context) {
  
    /**
     * Torna o Event auto instanciavel, evitando a necessidade do 'new' toda
     * vez que for utilizar o Event
     */
    if (!(this instanceof Event)) {
      return new Event(context || document);
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
      return context.querySelector(query) || stub();
    }
    
    /**
     * Decide se deve legegar o evento propagado
     * 
     * @private
     * @method criteria
     * @param {String} event Nome do evento
     * @param {String} query Seletor para localizar o elemento
     * @param {Function} callback Funcao callback
     * @example
     * 
     *        criteria('click', 'body', fucntion () {});
     * 
     */
    function criteria(event, query, callback) {
      Event.target(event).matches(query) && callback(event);
    }
    
    /**
     * Com delegation nos podemos ouvir por eventos que acontecem no HTML como click,
     * mousedown, entre outros. Porem em vez de adicionar eventos para cada elemento no DOM,
     * nos adicionamos apenas um evento em um elemento pai,
     * que irá servir para detectar eventos nos elementos filhos
     * 
     * @public
     * @method delegation
     * @param {String} type Nome do evento que ser escultado ou deixara de ser escultado
     * @param {String} query Seletor de elementos
     * @param {Functon} callback Funcao que sera executado quando o evento for disparado
     * @example
     * 
     *        $event(this).delegation('click', '#id', function () {});
     * 
     */
    function delegation(type, query, callback) {
      context.addEventListener(type, $curry(criteria)(_, query, callback), !1);
    }
  
    /**
     * Seleciona um Node para aplicar ou remover eventos
     * 
     * @private
     * @method hook
     * @param {String} method nome dos eventos, podendo ser addEventListener ou removeEventListener
     * @param {String} type Nome do evento que ser escultado ou deixara de ser escultado
     * @param {String} query Seletor de elementos
     * @param {Functon} callback Funcao que sera executado quando o evento for disparado
     * @example
     * 
     *        hook('addEventListener', 'body', 'click', function () {});
     * 
     */
    function hook(method, type, query, callback) {
      $(query)[method](type, callback, !1);
    }
    
    /**
     * Funcao fake para ser executado quando um elemento node nao for
     * encontrado no escope ou no document
     * 
     * @private
     * @method stub
     * @return {Function} Funcao que nao executa nada
     * @example
     * 
     *        stub();
     * 
     */
    function stub() {
      return { addEventListener: stub, removeEventListener: stub };
    }
    
    /**
     * Revelacao dos metodos da Class Event, encapsulando a visibilidade das funcoes
     * privadas
     */
    return {
      
      /**
       * Com delegation nos podemos ouvir por eventos que acontecem no HTML como click,
       * mousedown, entre outros. Porem em vez de adicionar eventos para cada elemento no DOM,
       * nos adicionamos apenas um evento em um elemento pai,
       * que irá servir para detectar eventos nos elementos filhos
       * 
       * @public
       * @method delegation
       * @param {String} type Nome do evento que ser escultado ou deixara de ser escultado
       * @param {String} query Seletor de elementos
       * @param {Functon} callback Funcao que sera executado quando o evento for disparado
       * @example
       * 
       *        $event(this).delegation('click', '#id', function () {});
       * 
       */
      delegation: $curry(delegation),
      
      /**
       * Adiciona eventos, a funcao curry
       * 
       * @public
       * @method on
       * @param {String} type Nome do evento que ser escultado ou deixara de ser escultado
       * @param {String} query Seletor de elementos
       * @param {Functon} callback Funcao que sera executado quando o evento for disparado
       * @example
       * 
       *        $event().on('click', 'body', function () {});
       * 
       */
      on: $curry(hook)('addEventListener'),
      
      /**
       * Remove eventos, a funcao curry
       * 
       * @public
       * @method off
       * @param {String} type Nome do evento que ser escultado ou deixara de ser escultado
       * @param {String} query Seletor de elementos
       * @param {Functon} callback Funcao que sera executado quando o evento for disparado
       * @example
       * 
       *        $event().off('click', 'body', function () {});
       * 
       */
      off: $curry(hook)('removeEventListener')
      
    };
  
  }
  
  /**
   * Encontra o elemento dentro do objeto event
   * 
   * @static
   * @method target
   * @param {Event} event Evento que foi disparado
   * @return {Node} elemento que sofreu o evento
   * @example
   *
   *        $event.target(event);
   * 
   */
  Event.target = function (event) {
    return event.toElement || event.srcTarget || event.target || event.srcElement;
  };
  
  /**
   * Revelacao do modulo $event, encapsulando a visibilidade das funcoes
   * privadas
   */
  return Event;
    
});