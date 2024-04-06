export class NoGeneratorUtils {
  static getRandomArbitrary(): string {
    return (Math.random() * (999999 - 100000) + 100000).toFixed(0);
  }

  static generateCode = async (length = 16): Promise<string> => {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  static async verificationCode(length = 4) {
    return (Math.random() * (999999 - 100000) + 100000)
      .toFixed(0)
      .toString()
      .substring(0, length);
  }
}
