class SoundManager {
  private static instance: SoundManager;
  private mainMusic: HTMLAudioElement | null = null;
  private backgroundMusic: HTMLAudioElement | null = null;
  private clickSound: HTMLAudioElement | null = null;
  private correctAnswerSound: HTMLAudioElement | null = null;
  private wrongAnswerSound: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isMainMusicPlayed: boolean = false;

  private constructor() {
    // Инициализация звуков
    this.mainMusic = new Audio('/sounds/main.mp3');
    this.mainMusic.volume = 0.3;

    this.backgroundMusic = new Audio('/sounds/background.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3;

    this.clickSound = new Audio('/sounds/click.mp3');
    this.clickSound.volume = 0.5;

    this.correctAnswerSound = new Audio('/sounds/correct.mp3');
    this.correctAnswerSound.volume = 0.5;

    this.wrongAnswerSound = new Audio('/sounds/wrong.mp3');
    this.wrongAnswerSound.volume = 0.5;
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public playMainMusic(): void {
    if (!this.isMuted && this.mainMusic && !this.isMainMusicPlayed) {
      this.mainMusic.play().catch((error) => {
        console.error('Error playing main music:', error);
      });
      this.isMainMusicPlayed = true;

      // После окончания стартовой музыки запускаем фоновую
      this.mainMusic.onended = () => {
        this.playBackgroundMusic();
      };
    }
  }

  public playBackgroundMusic(): void {
    if (!this.isMuted && this.backgroundMusic) {
      this.backgroundMusic.play().catch((error) => {
        console.error('Error playing background music:', error);
      });
    }
  }

  public stopBackgroundMusic(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }

  public playClickSound(): void {
    if (!this.isMuted && this.clickSound) {
      this.clickSound.currentTime = 0;
      this.clickSound.play().catch((error) => {
        console.error('Error playing click sound:', error);
      });
    }
  }

  public playCorrectAnswerSound(): void {
    if (!this.isMuted && this.correctAnswerSound) {
      this.correctAnswerSound.currentTime = 0;
      this.correctAnswerSound.play().catch((error) => {
        console.error('Error playing correct answer sound:', error);
      });
    }
  }

  public playWrongAnswerSound(): void {
    if (!this.isMuted && this.wrongAnswerSound) {
      this.wrongAnswerSound.currentTime = 0;
      this.wrongAnswerSound.play().catch((error) => {
        console.error('Error playing wrong answer sound:', error);
      });
    }
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBackgroundMusic();
      if (this.mainMusic) {
        this.mainMusic.pause();
      }
    } else {
      if (!this.isMainMusicPlayed) {
        this.playMainMusic();
      } else {
        this.playBackgroundMusic();
      }
    }
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  public resetMainMusic(): void {
    this.isMainMusicPlayed = false;
    if (this.mainMusic) {
      this.mainMusic.currentTime = 0;
    }
  }
}

export default SoundManager;
