/** 从扩展名判断一个文件是否是图片 */
const isPicture = (name: string) => {
  const regExp =
    /(.apng|.avif|.bmp|.gif|.ico|.cur|.jpg|.jpeg|.jfif|.pjpeg|.pjp|.png|.svg|.tif|.tiff|.webp)$/;
  return regExp.test(name);
};

export default isPicture;
