### $event

Modulo de delegação evento. Se você estiver familiarizado com jQuery, então ele pode parecer familiar para você

```javascript
this.Ninja(['$event'], function ($event) {
  $event(document).on('addEventListener', 'body', function () {});
});
```