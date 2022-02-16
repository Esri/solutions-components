/**
 * A factory function for the bind decorator
 *
 * @returns The bind decorator function
 */
export default function BindDecoratorFactory () {
  /**
   * A decorator function that automatically binds the decorated function's
   * context to the class prototype (i.e. value of `this` keyword). This is helpful
   * to avoid creating arrow functions in JSX code.
   *
   * @param _target A reference to the class prototype
   * @param propertyKey The name of the method being decorated
   * @param descriptor A PropertyDescriptor for the method being decorated
   * @returns A new PropertyDescriptor that prebinds context to a class method
   */
  function BindDecorator (
    _target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const { value: original } = descriptor
    if (typeof original !== 'function') {
      throw new TypeError(`${propertyKey} must be a function`)
    }
    return {
      get () {
        const value = original.bind(this)
        Object.defineProperty(this, propertyKey, { value })
        return value
      }
    }
  }
  return BindDecorator
}
