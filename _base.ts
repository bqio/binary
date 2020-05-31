export default class Base {
  /**
   * Offset in buffer.
   */
  protected offset: number = 0;
  /**
   * Buffer.
   */
  protected buf: Uint8Array = new Uint8Array();

  /**
   * Set new position buffer.
   * @param offset Offset
   */
  setPosition(offset: number) {
    this.offset = offset;
  }

  /**
   * Get current position buffer.
   */
  getPosition(): number {
    return this.offset;
  }

  /**
   * Get source buffer.
   */
  getSource(): Uint8Array {
    return this.buf;
  }
}
