export default abstract class Stream {
  /**
   * Offset in stream.
   */
  protected offset: number = 0;

  /**
   * Byte array.
   */
  protected buffer: Uint8Array = new Uint8Array();

  /**
   * Set new position.
   * @param offset Offset
   */
  setPosition(offset: number) {
    this.offset = offset;
  }

  /**
   * Get current position.
   */
  getPosition(): number {
    return this.offset;
  }

  /**
   * Get source byte array.
   */
  getSource(): Uint8Array {
    return this.buffer;
  }
}
