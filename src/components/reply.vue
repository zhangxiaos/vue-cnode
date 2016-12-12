<template>
    <section class="reply">
        <textarea id="content" rows="8" class="text"
            :class="{'err':hasErr}"
            v-model="content"
            placeholder='回复支持Markdown语法,请注意标记代码'>
        </textarea>
        <a class="button" @click="addReply">回复</a>
    </section>
</template>

<script>
    var utils = require('../libs/utils'),
        markdown = require("markdown").markdown;

    export default {
        props: ['topic', 'replyId', 'topicId', 'show'],
        data () {
            return {
                hasErr: false,
                content: '',
                userId: localStorage.userId || '',
            }
        },
        methods:{
            addReply (){
                if(!this.content){
                    this.hasErr = true;
                }
                else{
                    let time          = new Date(), 
                        linkUsers     = utils.linkUsers(this.content), 
                        htmlText      = markdown.toHTML(linkUsers), 
                        reply_content = $('<div class="markdown-text"></div>').append(htmlText)[0].outerHTML, 
                        postData      = {accesstoken:localStorage.token, content: this.content};

                    if(this.replyId){
                        postData.reply_id = this.replyId;
                    }

                    this.$http.post(`topic/${this.topicId}/replies`, {
                        accesstoken: postData.accesstoken,
                        content: postData.content,
                        reply_id: postData.replyId
                    })
                    .then(res => {
                        if (res.success) {
                            console.log(res.reply_id)
                            this.topic.replies.push({
                                id: res.reply_id,
                                author: {
                                    loginname: this.userId,
                                    avatar_url: localStorage.avatar_url
                                },
                                content: reply_content,
                                ups: [],
                                create_at: time
                            });
                        }

                        this.content = '';
                        if (this.show) {
                            this.show = '';
                        }
                    });
                }
            }
        }
    }
</script>
