import { IPasswordHasher } from "../../domains/services/passwordHasher.interface";
import { IUserRepository } from "../../repositories/user/user.interface";
import { UserService } from "../../services/user.service"
import { SignUpType } from "@lms/utils/schemas/userSchema";




describe("UserService", () => {
    let userService: UserService;
    let userRepository: jest.Mocked<IUserRepository>;
    let passwordHasher: jest.Mocked<IPasswordHasher>
    const data = {
            email: "validEmail@gmail.com",
            password: "@validPassword123",
            typeUser: "student"
        } as SignUpType
    beforeEach(() => {
        userRepository = {
            create: jest.fn().mockResolvedValue({ ok: true }),
            findUserByEmail: jest.fn().mockResolvedValue({ ok: true, user: null }),
        };
        passwordHasher = {
            hashPassword: jest.fn().mockResolvedValue("PasswordHashed123")
        }
        userService = new UserService(userRepository, passwordHasher);
    })

    describe("registerUser", () => {
        beforeAll(() => {
            jest.clearAllMocks();
        })
        
        beforeEach(() => {
            jest.spyOn(userService, "validateUserExists").mockResolvedValue(false);
        })

        it("shoud return ok true when user is registered successfully", async () => {
        
            const result = await userService.registerUser(data)

            expect(result.ok).toBe(true)
            expect(result.error).toBeUndefined()
        })
        it("shoud return ok false when data is invalid", async () => {
            const data = {
                email: "validEmail@gmail.com",
                password: "123",
                typeUser: "student"
            } as SignUpType
            const result = await userService.registerUser(data) 
            
            expect(result.ok).toBe(false)
            expect(result.error).toBeDefined()
            expect(result.error).toContain("password")
        })

        it("shoud userRepository called with correct data", async () => {
            await userService.registerUser(data)
            const passwordHashed =  await passwordHasher.hashPassword(data.password)
            expect(userRepository.create).toHaveBeenCalledWith({...data, password: passwordHashed});
            expect(userRepository.create).toHaveBeenCalledTimes(1);

        })
        it("shoud passwordHashed called with correct data", async () => {
            await userService.registerUser(data)
            expect(passwordHasher.hashPassword).toHaveBeenCalledWith(data.password);
            expect(passwordHasher.hashPassword).toHaveBeenCalledTimes(1);

        })
        it("shoud return ok true if userRepository returns ok: true", async () => {
            
            const result = await userService.registerUser(data)

            const expectedResult = { ok: true, error: undefined }
            expect(result).toEqual(expectedResult)

        })

        it("shoud return ok false if userRepository returns ok: false", async () => {
            userRepository.create.mockResolvedValueOnce({ ok: false, error: 'Erro ao cadastrar usuário' })
            
            const result = await userService.registerUser(data)

            const expectedResult = { ok: false, error: result.error || 'Erro ao cadastrar usuário' }
            expect(result).toEqual(expectedResult)

        })
        it("shoud return true if user have been registered", async () => {
            jest.spyOn(userService, "validateUserExists").mockResolvedValueOnce(true);
            const result = await userService.registerUser(data)

            const expectedResult = { ok: false, error: 'Usuário já cadastrado' }
            expect(result).toEqual(expectedResult)
        })

        it("shoud validateUserExists called with correct data", async () => {
            await userService.registerUser(data)
            
            expect(userService.validateUserExists).toHaveBeenCalledWith(data.email);
            expect(userService.validateUserExists).toHaveBeenCalledTimes(1);
        })

        it("should return ok false if userRepository.create throws error", async () => {
            userRepository.create.mockRejectedValueOnce(new Error("DB error"));
            const result = await userService.registerUser(data);
            expect(result.ok).toBe(false);
            expect(result.error).toContain("DB error");
        });

        it("should return ok false if userRepository.findUserByEmail throws error", async () => {
            jest.spyOn(userService, "validateUserExists").mockRejectedValueOnce(new Error("DB error"));
            const result = await userService.registerUser(data);
            expect(result.ok).toBe(false);
            expect(result.error).toContain("DB error");
        });

        it("should return ok false if email is missing", async () => {
            const invalidData = { ...data, email: "" };
            const result = await userService.registerUser(invalidData);
            expect(result.ok).toBe(false);
            expect(result.error).toContain("email");
        });
    })

    describe("validateUserExists", () => {
        beforeAll(() => {
            jest.clearAllMocks();
        })

        it("should userRepository called with correct data", async () => {
            const email = "unregistereduser@gmail.com"

            await userService.validateUserExists(email)
            expect(userRepository.findUserByEmail).toHaveBeenCalledWith(email)
            expect(userRepository.findUserByEmail).toHaveBeenCalledTimes(1)
        })

        it("should return ok false if user does not exist", async () => {
            userRepository.findUserByEmail.mockResolvedValueOnce({ ok: false, user: null })
            const email = "unregistereduser@gmail.com"
            const result = await userService.validateUserExists(email)

            expect(result).toEqual(false)
        })
        it("should return ok true if user is registered", async () => {
            const email = "registereduser@gmail.com"
            const result = await userService.validateUserExists(email)

            expect(result).toEqual(true)
        })
        it("should handle error in validateUserExists", async () => {
            userRepository.findUserByEmail.mockRejectedValueOnce(new Error("DB error"));

            await expect(userService.validateUserExists("erro@email.com"))
            .rejects
            .toThrow("DB error");
        });
    })

    

})