import React from 'react';
import type { FormData } from '../../types';
import postFormStyles from './PostForm.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';



type Props = {
  formData: FormData;
  onChange: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onRemoveImage: (index: number) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
};

const CATEGORIES = ['direction', 'design', 'coding', 'wordpress'];

const PostForm: React.FC<Props> = ({ formData, onChange, onSubmit, onRemoveImage,isSubmitting }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof FormData, value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      onChange('categories', [...formData.categories, value]);
    } else {
      onChange(
        'categories',
        formData.categories.filter((cat) => cat !== value)
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;

      if (
        target.tagName === 'INPUT' &&
        ['text', 'url'].includes((target as HTMLInputElement).type)
      ) {
        e.preventDefault();
      }
    }
  };

  return (
    <form onSubmit={onSubmit} onKeyDown={handleKeyDown} className={postFormStyles.postForm}>
      <button type="submit" disabled={isSubmitting} className={postFormStyles.submit}><FontAwesomeIcon icon={faPlus} /> {isSubmitting ? '登録中...' : '登録'}
      </button>
      <div className={postFormStyles.pageContents}>
        <div className={postFormStyles.inputRow}>
          <label htmlFor='title'>タイトル</label>
          <input
            type="text"
            name="title"
            id='title'
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='client'>クライアント名</label>
          <input
            type="text"
            name="client"
            id='client'
            value={formData.client}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='url'>URL</label>
          <input
            type="url"
            name="url"
            id='url'
            value={formData.url}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='url_text'>リンクテキスト</label>
          <input
            type="text"
            name="url_text"
            id='url_text'
            value={formData.url_text}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='description'>概要</label>
          <textarea
            name="description"
            id='description'
            value={formData.description}
            onChange={handleInputChange}
            rows={6}
          ></textarea>
        </div>
        <div>
          <p className={postFormStyles.label}>画像（最大5枚 / 1枚目はサムネイルとして使用）</p>
          <ul>
            {[0, 1, 2, 3, 4].map((idx) => {
              const file = formData.images[idx];
              const imageUrl =
                typeof file === 'string'
                  ? file
                  : file instanceof File
                  ? URL.createObjectURL(file)
                  : '';

              return (
                <li key={idx} className={postFormStyles.imgArea}>
                  <p>{idx === 0 ? 'サムネイル' : `画像 ${idx}`}</p>

                  {/* 画像アップロード（常に表示） */}
                  <input
                    type="file"
                    id={`upload-${idx}`}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const updatedImages = [...formData.images];
                        updatedImages[idx] = e.target.files[0];
                        onChange('images', updatedImages);
                      }
                    }}
                  />
                  <label htmlFor={`upload-${idx}`} className={postFormStyles.fileBtn}>
                    画像を選択
                  </label>

                  {/* 画像プレビュー */}
                  {file && (
                    <div>
                      <img
                        src={imageUrl}
                        alt={`preview-${idx}`}
                        style={{ maxWidth: '200px', height: 'auto', borderRadius: '8px', display: 'block', marginBottom: '0.5rem' }}
                      />
                      <div className={postFormStyles.imgDelete}>
                        {typeof file === 'string'
                          ? file.split('?')[0].split('/').pop() ?? file
                          : file.name}
                        <button
                          type="button"
                          onClick={() => onRemoveImage(idx)}
                          className={postFormStyles.remove}
                        >
                          <FontAwesomeIcon icon={['fas', 'circle-xmark']} /> 削除
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={postFormStyles.pageData}>
        <div>
          <label>スラッグ</label>
          <input
            type="text"
            name="slug"
            id="slug"
            value={formData.slug}
            onChange={handleInputChange}
            required
            readOnly
          />
        </div>
        <div>
          <label>カテゴリー（複数選択可）</label>
          <div className="category-options">
            {CATEGORIES.map((cat) => (
              <label key={cat} style={{ marginRight: '10px' }}>
                <input
                  type="checkbox"
                  value={cat}
                  checked={formData.categories.includes(cat)}
                  onChange={handleCategoryChange}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>
      <button type="submit" disabled={isSubmitting} className={postFormStyles.submit}><FontAwesomeIcon icon={faPlus} /> {isSubmitting ? '登録中...' : '登録'}
      </button>
    </form>
  );
};

export default PostForm;
