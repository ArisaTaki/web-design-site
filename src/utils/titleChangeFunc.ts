export const titleChangeFunc = () => {
  let time: NodeJS.Timeout;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      document.title = '|·ω·`)躲起来.....躲起来.....躲起来.....躲起来.....';
    } else {
      document.title = '눈_눈终于还是被发现了';
    }
    if (!document.hidden) {
      const titleTimout = setTimeout(() => {
        document.title = 'Eikoの摆烂技术屋';
      }, 2000);
      time = titleTimout;
    } else {
      clearTimeout(time);
    }
  });
};
