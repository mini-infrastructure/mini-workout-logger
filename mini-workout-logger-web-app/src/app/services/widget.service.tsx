import type {WidgetWriteDTO} from '../dtos/widget-write.dto.tsx';
import type {WidgetReadDTO} from '../dtos/widget-read.dto.tsx';
import axios from 'axios';
import type {ApiResponseDTO} from '../dtos/api-response.dto.tsx';

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class WidgetService {

    async update(id: number, payload: WidgetWriteDTO): Promise<WidgetReadDTO> {
        const response = await axios.put<ApiResponseDTO<WidgetReadDTO[]>>(
            `${apiUrl}/widgets/${id}`,
            payload,
            { params: { lang } }
        );
        return response.data.data[0];
    }
}

const widgetService = new WidgetService();
export default widgetService;
