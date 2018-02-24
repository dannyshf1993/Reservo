import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";


@Injectable()
export class CommentsService {

    private comments: { restname: string, hourtitle: string, title: string, tit: string, request: string, table: string, name: string, phone: string, email: string, firebaseid: string }[] = [];

    constructor(

        public storage: Storage
    ) { }

    addComment(comment: { restname: string, hourtitle: string, title: string, tit: string, request: string, table: string, name: string, phone: string, email: string, firebaseid: string }) {
        this.comments.push(comment);
        this.storage.set('comments', this.comments);
        console.log(this.storage);

    }

    getComments() {
        return this.storage.get('comments')
            .then(
            // return this.comments.slice();
            (comments) => {
                this.comments = comments == null ? [] : comments;
                return this.comments.slice();

            }

            )

    }

    removeComments() {
        return this.storage.remove('comments');
        // return this.storage.remove('comment');
            // .then(
            // (comments) => {
            //     for (var i = 0; i < this.comments.length; i++) {
            //         this.comments = comments == null ? [] : comments;
            //         return this.comments.splice(i, 1);
                    
            //     }

            // }
            // )
    }

}