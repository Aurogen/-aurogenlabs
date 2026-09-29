-- Consistent product packshots (same vial, label and background for every product).
-- Run in Supabase > SQL Editor.

BEGIN;

UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_9fde8aa4-414d-4c37-a7f9-85d36ed6d7c0.png' WHERE slug = 'retatrutide-10mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_9fde8aa4-414d-4c37-a7f9-85d36ed6d7c0.png' WHERE slug = 'retatrutide-15mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_9fde8aa4-414d-4c37-a7f9-85d36ed6d7c0.png' WHERE slug = 'retatrutide-20mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_9fde8aa4-414d-4c37-a7f9-85d36ed6d7c0.png' WHERE slug = 'retatrutide-30mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_9fde8aa4-414d-4c37-a7f9-85d36ed6d7c0.png' WHERE slug = 'retatrutide-60mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_0a1e32d0-3cdd-448d-86ed-a1978ccb4e9a.png' WHERE slug = 'tirzepatide-10mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_0a1e32d0-3cdd-448d-86ed-a1978ccb4e9a.png' WHERE slug = 'tirzepatide-15mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_0a1e32d0-3cdd-448d-86ed-a1978ccb4e9a.png' WHERE slug = 'tirzepatide-20mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_0a1e32d0-3cdd-448d-86ed-a1978ccb4e9a.png' WHERE slug = 'tirzepatide-30mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_0a1e32d0-3cdd-448d-86ed-a1978ccb4e9a.png' WHERE slug = 'tirzepatide-60mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_8dcb18b7-ea4d-4eca-b05f-69a13c7f5a3b.png' WHERE slug = 'ghk-cu-100mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_489fc8b4-1651-4fb5-adc7-0ef1cc33c2f2.png' WHERE slug = 'tesamorelin-10mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_09558d4f-0819-44fb-95e5-b84a5fa39a85.png' WHERE slug = 'tb-500-10mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204044_9a592981-ce95-4a2f-959b-732c7447dfc3.png' WHERE slug = 'bpc-157-10mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_c1e43088-9807-451b-9fc5-f201730e98d5.png' WHERE slug = 'tb-500-bpc-157-combo';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_f5a119af-32a7-4c5f-a6de-168791baa378.png' WHERE slug = 'nad-plus-500mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_015c0f05-e05e-4494-b9bf-5f4f3c2bd19b.png' WHERE slug = 'mots-c-40mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_015c0f05-e05e-4494-b9bf-5f4f3c2bd19b.png' WHERE slug = 'mots-c-10mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204152_133852e6-357e-4e30-a155-b5deab3c2e4e.png' WHERE slug = 'ipamorelin-10mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_5e8d1ad5-892f-4355-af25-5334fb2cdb9c.png' WHERE slug = 'ipamorelin-cjc-1295-combo';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_e3935470-ae8b-4971-bce0-6cb0f6e7350a.png' WHERE slug = 'sermorelin-10mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204150_5bc4f7d4-49bb-4d1f-8240-0eb9f5ec1ef5.png' WHERE slug = 'klow-blend-80mg';
UPDATE products SET image = 'https://d8j0ntlcm91z4.cloudfront.net/user_37vyPYiQEAbVkqfXE5Q1uQwgRqg/hf_20260929_204203_f01df26a-4249-4eeb-ae55-7404af2cdb45.png' WHERE slug = 'bacteriostatic-water-10ml';

COMMIT;
