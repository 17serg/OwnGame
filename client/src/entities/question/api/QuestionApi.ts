import { axiosInstance } from '@/shared/lib/axiosInstance';
import { IQuestion } from '../model';

export class QuestionApi {
  static async getQuestionById(id: number): Promise<IQuestion> {
    const response = await axiosInstance.get(`/game/question/${id}`);
    return response.data;
  }

  static async getAllQuestions(): Promise<IQuestion[]> {
    const response = await axiosInstance.get('/game/questions');
    return response.data;
  }
}
