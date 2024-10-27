import {
  UserService,
  AdminService,
  AuthService,
  StakeService,
  TaskService,
  QuizzesService
} from '@app'

/**
 * A Singleton class that provides access to various services.
 * This class ensures that only one instance of each service is created and provides
 * a way to access that instance.
 */
class Singleton {
  private static adminInstance: AdminService
  private static authInstance: AuthService
  private static userInstance: UserService
  private static quizzesInstance: QuizzesService
  private static stakeInstance: StakeService
  private static taskInstance: TaskService

  /**
   * Returns the singleton instance of the AdminService class. If the instance does not exist,
   * it creates a new one.
   * @returns {AdminService} - The singleton instance of the AdminService class.
   */
  public static getAdminInstance(): AdminService {
    if (!Singleton.adminInstance) {
      Singleton.adminInstance = new AdminService()
    }
    return Singleton.adminInstance
  }

  /**
   * Returns the singleton instance of the AuthService class. If the instance does not exist,
   * it creates a new one.
   * @returns {AuthService} - The singleton instance of the AuthService class.
   */
  public static getAuthInstance(): AuthService {
    if (!Singleton.authInstance) {
      Singleton.authInstance = new AuthService()
    }
    return Singleton.authInstance
  }

  /**
   * Returns the singleton instance of the QuizService class. If the instance does not exist,
   * it creates a new one.
   * @returns {QuizService} - The singleton instance of the QuizService class.
   */
  public static getQuizzesInstance(): QuizzesService {
    if (!Singleton.quizzesInstance) {
      Singleton.quizzesInstance = new QuizzesService()
    }
    return Singleton.quizzesInstance
  }

  /**
   * Returns the singleton instance of the StakeService class. If the instance does not exist,
   * it creates a new one.
   * @returns {StakeService} - The singleton instance of the StakeService class.
   */
  public static getStakeInstance(): StakeService {
    if (!Singleton.stakeInstance) {
      Singleton.stakeInstance = new StakeService()
    }
    return Singleton.stakeInstance
  }

  /**
   * Returns the singleton instance of the TaskService class. If the instance does not exist,
   * it creates a new one.
   * @returns {TaskService} - The singleton instance of the TaskService class.
   */
  public static getTaskInstance(): TaskService {
    if (!Singleton.taskInstance) {
      Singleton.taskInstance = new TaskService()
    }
    return Singleton.taskInstance
  }

  /**
   * Returns the singleton instance of the UserService class. If the instance does not exist,
   * it creates a new one.
   * @returns {UserService} - The singleton instance of the UserService class.
   */
  public static getUserInstance(): UserService {
    if (!Singleton.userInstance) {
      Singleton.userInstance = new UserService()
    }
    return Singleton.userInstance
  }
}

export { Singleton }
