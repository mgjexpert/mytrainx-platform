-- Advisor fixes for MyTrainX Content & Knowledge Foundation V1

drop index if exists public.content_items_tags_idx;
drop index if exists public.content_items_topics_idx;

create index if not exists content_collection_items_content_id_idx
  on public.content_collection_items(content_id);
create index if not exists content_collection_product_access_product_id_idx
  on public.content_collection_product_access(product_id);
create index if not exists content_relationships_target_content_id_idx
  on public.content_relationships(target_content_id);
create index if not exists exercise_content_links_content_id_idx
  on public.exercise_content_links(content_id);
create index if not exists exercise_relations_related_exercise_id_idx
  on public.exercise_relations(related_exercise_id);
create index if not exists knowledge_documents_source_id_idx
  on public.knowledge_documents(source_id);
create index if not exists recipe_ingredients_food_id_idx
  on public.recipe_ingredients(food_id);

drop policy if exists source_collections_deny_client on public.source_collections;
create policy source_collections_deny_client
on public.source_collections for all
to anon, authenticated
using (false) with check (false);

drop policy if exists content_rights_deny_client on public.content_rights;
create policy content_rights_deny_client
on public.content_rights for all
to anon, authenticated
using (false) with check (false);

drop policy if exists content_reviews_deny_client on public.content_reviews;
create policy content_reviews_deny_client
on public.content_reviews for all
to anon, authenticated
using (false) with check (false);

drop policy if exists knowledge_documents_deny_client on public.knowledge_documents;
create policy knowledge_documents_deny_client
on public.knowledge_documents for all
to anon, authenticated
using (false) with check (false);

drop policy if exists knowledge_chunks_deny_client on public.knowledge_chunks;
create policy knowledge_chunks_deny_client
on public.knowledge_chunks for all
to anon, authenticated
using (false) with check (false);
