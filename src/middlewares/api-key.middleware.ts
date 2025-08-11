import { Request } from 'express';
import { ApiKeyService } from '../services/api-key.service';

export async function validateApiKeyFromHeader(req: Request) {
  const key = req.header('x-api-key') || req.header('X-API-Key');
  if (!key) return null;
  
  const apiKey = await ApiKeyService.findByKey(key);
  if (!apiKey) return null;

  if (apiKey.expiration && apiKey.expiration < new Date()) {
    return null;
  }

  return apiKey;
}
