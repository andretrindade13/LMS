export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public typeUser: 'student' | 'teacher',
    public createdAt: Date,
    public updatedAt: Date
  ) {}
  
}
