import { UserRepositoryInMemory } from "../../repositories/user/user.repositoryInMemory";

describe("UserRepository", () => {
    describe("create", () => {
        
        it("shoud userRepository called with correct params", async () => {
            const data = {
                email: "valid@gmail.com",
                password: "validPassword123",
                typeUser: 'student' as const
            } 

            const userRepository = new UserRepositoryInMemory()
            const createSpy = jest.spyOn(userRepository, "create")
            await userRepository.create(data)

            expect(createSpy).toHaveBeenCalledWith(data)
            expect(createSpy).toHaveBeenCalledTimes(1)
        })
        it("should return ok: false if a user is already registered with the same email", async () => {
            const userRepository = new UserRepositoryInMemory()
             const data = {
                email: "registered@gmail.com",
                password: "validPassword123",
                typeUser: 'student' as const
            }
            await userRepository.create(data)
            const result = await userRepository.create(data)
            expect(result).toEqual({ ok: false, error: "Úsuário já cadastrado" })
        })

        it("should throw an error if the DB transaction fails", async () => {
            const userRepository = new UserRepositoryInMemory()
            jest.spyOn(userRepository['users'], 'get').mockImplementation(() => {
                throw new Error('Simulated DB failure');
            });
             const data = {
                email: "valid@gmail.com",
                password: "validPassword123",
                typeUser: 'student' as const
            }
            await expect(userRepository.create(data))
            .rejects
            .toThrow("DB Error: Error: Simulated DB failure");
        })


    })

    describe("findUserByEmail", () => {
        it("shoud return ok: false if user is not registered ", async () => {
            const userRepository = new UserRepositoryInMemory()
            const email = "unregistered@gmail.com"
            const result = await userRepository.findUserByEmail(email)
            expect(result).toEqual({ ok: false, user: null })
        })

        it("shoud return ok: true if user is registered ", async () => {
            const userRepository = new UserRepositoryInMemory()
            const email = "registered@gmail.com"
            await userRepository.create({
                email,
                password: "validPassword123",
                typeUser: 'student' as const
            })
            const result = await userRepository.findUserByEmail(email)
            expect(result).toStrictEqual({ ok: true, user: result.user })
        })

        it("should throw an error if the DB transaction fails", async () => {
            const userRepository = new UserRepositoryInMemory()
            jest.spyOn(userRepository['users'], 'get').mockImplementation(() => {
                throw new Error('Simulated DB failure');
            });
            const email = "invalid@email"

            await expect(userRepository.findUserByEmail(email))
            .rejects
            .toThrow("DB Error: Error: Simulated DB failure");
        })
    })
        
})