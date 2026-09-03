import type {SetReadDTO} from "../../dtos/SetReadDTO";

class SetService {

    async getAll(): Promise<SetReadDTO[]> {
        throw new Error('SetService.getAll not implemented');
    }
    async getById(_id: string): Promise<SetReadDTO> {
        throw new Error('SetService.getById not implemented');
    }
    async create(_set: SetReadDTO): Promise<SetReadDTO> {
        throw new Error('SetService.create not implemented');
    }
    async update(_id: string, _set: SetReadDTO): Promise<SetReadDTO> {
        throw new Error('SetService.update not implemented');
    }
    async delete(_id: string): Promise<void> {
        throw new Error('SetService.delete not implemented');
    }

}

export default new SetService();