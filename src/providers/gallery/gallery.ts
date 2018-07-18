// import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';

/*
  Generated class for the GalleryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GalleryProvider {

	public gallaryDirPath: string;
	public gallaryDirName: string = "SimaGallery";

	constructor(
		// public http: HttpClient,
		private platform: Platform,
		@Optional() private file: File
	) {
		console.log('Hello GalleryProvider Provider');
		this.initGalleryFolder();
	}
	initGalleryFolder() {

		this.platform.ready().then(() => {
			if (this.platform.is("android")) {
				this.gallaryDirPath = this.file.externalRootDirectory;
			} else if (this.platform.is("ios")) {
				this.gallaryDirPath = this.file.syncedDataDirectory;
			} else {
				// throw Error("Invalid Device");
			}

			this.file.checkDir(this.gallaryDirPath, this.gallaryDirName).then((isExist) => {
				if (!isExist) {
					this.createFolder();
				}
			}, (error) => {
				this.createFolder();
				console.log(error);
			});
		});
	}
	createFolder() {
		this.file.createDir(this.gallaryDirPath, this.gallaryDirName, true).then((dirEntry) => {
			console.log(dirEntry);
			
		}, (error) => {
			console.log(error);
		});
	}
}
