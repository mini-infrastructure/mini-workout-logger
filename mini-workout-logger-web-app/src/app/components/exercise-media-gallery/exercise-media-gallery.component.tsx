import {useRef, useState} from 'react';
import {MdAdd, MdClose} from 'react-icons/md';
import type {MediaReadDTO} from '../../dtos/media-read.dto.tsx';
import ExerciseService from '../../services/exercise.service.tsx';
import {useAlert} from '../../context/alert.context.tsx';
import styles from './exercise-media-gallery.component.style.tsx';

export type ExerciseMediaGalleryProps = {
    exerciseId: number;
    media: MediaReadDTO[];
    onChange: (media: MediaReadDTO[]) => void;
    disabled?: boolean;
};

const ExerciseMediaGallery = ({ exerciseId, media, onChange, disabled }: ExerciseMediaGalleryProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const pushAlert = useAlert();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const uploaded = await ExerciseService.uploadMedia(exerciseId, file);
            onChange([...media, uploaded]);
        } catch {
            pushAlert('Failed to upload media.', 'error');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleRemove = async (mediaId: number) => {
        try {
            await ExerciseService.deleteMedia(exerciseId, mediaId);
            onChange(media.filter((m) => m.id !== mediaId));
        } catch {
            pushAlert('Failed to remove media.', 'error');
        }
    };

    return (
        <div css={styles.container}>
            <span css={styles.sectionTitle}>Media</span>
            <div css={styles.gallery}>
                {media.map((m) => (
                    <div key={m.id} css={styles.mediaItem}>
                        <img
                            css={styles.mediaImg}
                            src={`data:${m.content_type};base64,${m.data}`}
                            alt={m.filename}
                        />
                        {!disabled && (
                            <button
                                className="remove-btn"
                                css={styles.removeBtn}
                                onClick={() => handleRemove(m.id)}
                                title="Remove"
                            >
                                <MdClose size={12} />
                            </button>
                        )}
                    </div>
                ))}

                {!disabled && (
                    <div
                        css={styles.uploadArea}
                        onClick={() => !uploading && fileInputRef.current?.click()}
                        title="Upload image"
                    >
                        <MdAdd css={styles.uploadIcon} />
                        <span>{uploading ? '...' : 'Add'}</span>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleUpload}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExerciseMediaGallery;
