<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<form>
						<fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control form-control-lg"
									placeholder="Article Title"
                                    v-model="article.title"
                                    :disabled="pending"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="What's this article about?"
                                    v-model="article.description"
                                    :disabled="pending"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control"
									rows="8"
									placeholder="Write your article (in markdown)"
                                    v-model="article.body"
                                    :disabled="pending"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="Enter tags"
                                    v-model="article.tag"
                                    :disabled="pending"
								/>
								<div class="tag-list"></div>
							</fieldset>
							<button
								class="btn btn-lg pull-xs-right btn-primary"
								type="button"
                                @click.prevent="postArticle"
                                :disabled="pending"
							>
								Publish Article
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { pubArticle } from '@/utils/api.js'
export default {
	middleware: 'authenticated',
	name: 'editor',
    data(){
        return {
            pending:false,
            article:{
                body:'',
                description:'',
                tag:'',
                title:''
            }
        }
    },
    methods:{
        // 发布文章
        postArticle(){
            let { article } = this;
            if(article.tag){
                article.tagList = article.tag.split(',')
            }
            pubArticle(article).then((res) => {
                this.$router.push(`/article/${res.article.slug}`)
            })
        }
    }
};
</script>
